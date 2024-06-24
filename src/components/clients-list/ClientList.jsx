import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import Layout from "../../whs-manager/Layout/WhsManager.jsx";
import API from "../../store/API.jsx";
import RowDetailsModal from "../../components/modal/RowDetailsModal.jsx";

const ClientList = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchInput = useRef(null);
    const [selectedRow, setSelectedRow] = useState(null); // State for selected row
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await API.get('/businesspartners/businesspartners');
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
            title: 'Hudud',
            dataIndex: 'region',
            key: 'region',
            width: '20%',
            ...getColumnSearchProps('region'),
        },
        {
            title: 'Mijoz',
            dataIndex: 'realizators',
            key: 'realizators',
            width: '20%',
            ...getColumnSearchProps('realizators'),
        },
        {
            title: 'Oy boshiga qoldiq',
            dataIndex: 'balanceFirstDayOfTheMonth',
            key: 'balanceFirstDayOfTheMonth',
            width: '15%',
            ...getColumnSearchProps('balanceFirstDayOfTheMonth'),
        },
        {
            title: 'Shu oydagi sotuv/ USD',
            dataIndex: 'currentAccountBalance',
            key: 'currentAccountBalance',
            width: '15%',
            ...getColumnSearchProps('currentAccountBalance'),
        },
        {
            title: 'To\'langan pul',
            dataIndex: 'paidMoney',
            key: 'paidMoney',
            width: '15%',
            render: (text) => `${text} USD`,
        },
        {
            title: 'Joriy qoldiq',
            dataIndex: 'currentAccountBalance',
            key: 'currentAccountBalance',
            width: '15%',
            ...getColumnSearchProps('currentAccountBalance'),
        },
        {
            title: 'Pul aylanish ko`rsatgichi ',
            dataIndex: 'moneySpeed',
            key: 'moneySpeed',
            width: '15%',
            ...getColumnSearchProps('moneySpeed'),
        },
        {
            title: 'Mas`ul sotuv menejeri ',
            dataIndex: 'salesPerson',
            key: 'salesPerson',
            width: '15%',
            ...getColumnSearchProps('salesPerson'),
        },
        {
            title: 'To`lanishi kerak ',
            dataIndex: 'balanceLastDayOfTheMonth',
            key: 'balanceLastDayOfTheMonth',
            width: '15%',
            ...getColumnSearchProps('balanceLastDayOfTheMonth'),
        },
        {
            title: 'Shu oydagi sotuv miqdori/ KG ',
            dataIndex: 'totalAmountReceived',
            key: 'totalAmountReceived',
            width: '15%',
            ...getColumnSearchProps('totalAmountReceived'),
        },

    ];

    const handleRowClick = (record) => {
        setSelectedRow(record);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedRow(null);
        setIsModalOpen(false);
    };

    return (
        <Layout>
            <h3 className={'pt-16 pb-10 px-12 text-2xl font-bold border-b-2'}>Mijozlar ro'yxati</h3>
            <Table
                className={'py-8 px-8 w-[1800px] overflow-x-scroll'}
                columns={columns}
                dataSource={data}
                loading={isLoading}

                onRow={(record) => ({
                    onClick: () => handleRowClick(record), // Set row click event
                })}
            />
            {selectedRow && (
                <RowDetailsModal
                    open={isModalOpen}
                    onClose={handleModalClose}
                    rowData={selectedRow}
                />
            )}
        </Layout>
    );
};

export default ClientList;
