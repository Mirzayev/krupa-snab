import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import Layout from "../../whs-manager/Layout/index.jsx";
import API from "../../store/API.jsx";
import RowDetailsModal from "../../components/modal/RowDetailsModal.jsx";

const MySales = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchInput = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await API.get('/meningsotuvlarim/no-pagination?ownerCode=12');
            const res = await response.data;
            const dataWithKeys = res.map((item, index) => ({ ...item, key: index }));
            setData(dataWithKeys);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Qidirish ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Qidirish
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button type="link" size="small" onClick={() => close()}>
                        Yopish
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Mijoz',
            dataIndex: 'cardName',
            key: 'cardName',
            width: '20%',
            ...getColumnSearchProps('cardName'),
        },
        {
            title: 'Buyurtma raqami',
            dataIndex: 'docNum',
            key: 'docNum',
            width: '15%',
            ...getColumnSearchProps('docNum'),
        },
        {
            title: 'Sana',
            dataIndex: 'docDueDate',
            key: 'docDueDate',
            width: '15%',
            ...getColumnSearchProps('docDueDate'),
        },
        {
            title: 'Summa',
            dataIndex: 'docTotal',
            key: 'docTotal',
            width: '15%',
            render: (text, record) => `${record.docTotal} ${record.docCur}`,
            ...getColumnSearchProps('docTotal'),
        },
        {
            title: 'Yaratuvchi',
            dataIndex: 'slpName',
            key: 'slpName',
            width: '15%',
            ...getColumnSearchProps('slpName'),
        },
    ];

    const handleModalOpen = (record) => {
        setSelectedRow(record);
        setOpen(true);
    };

    const handleModalClose = () => {
        setSelectedRow(null);
        setOpen(false);
    };

    return (
        <Layout>
            <h3 className="pt-16 pb-10 px-12 text-2xl font-bold border-b-2">Sotuv so`rovnomasi</h3>

            <div className="flex justify-end my-10 px-10">
                <Button className="px-10 py-4" type="primary" onClick={handleModalOpen}>
                    + Qo'shish
                </Button>
            </div>
            <Table
                className="py-8 px-8"
                columns={columns}
                dataSource={data}
                loading={isLoading}
                onRow={(record) => ({
                    onClick: () => handleModalOpen(record),
                })}
            />
            <RowDetailsModal
                open={open}
                onClose={handleModalClose}
                rowData={selectedRow}
            />
        </Layout>
    );
};

export default MySales;
