import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import Layout from "../../whs-manager/Layout/WhsManager.jsx";
import API from "../../store/API.jsx";
import RowDetailsModal from "../../components/modal/RowDetailsModal.jsx";


const Purchases = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null); // State to hold selected row data

    const searchInput = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await API.get('/purchaseinvoices');
                const res = await response.data;
                setData(res);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Qidirish ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Qidirish
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Yopish
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
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
            ...getColumnSearchProps('docTotal'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button type="link" onClick={() => handleRowDetails(record)}>
                    Show Details
                </Button>
            ),
        },
    ];

    const handleRowDetails = (record) => {
        setSelectedRowData(record);
        setModalVisible(true);
    };

    return (
        <Layout>
            <h3 className={'pt-16 pb-10 px-12 text-2xl font-bold border-b-2'}>Xaridlar</h3>
            <Table className={'py-8 px-8'} columns={columns} dataSource={data} loading={isLoading} />

            <RowDetailsModal
                open={modalVisible}
                onClose={() => setModalVisible(false)}
                rowData={selectedRowData}
            />
        </Layout>
    );
};

export default Purchases;
