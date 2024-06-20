import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import Layout from "../../whs-manager/Layout/index.jsx";
import API from "../../store/API.jsx";

const WarehouseAccount = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchInput = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await API.get('/items/ombordagiitems');
                const res = await response.data;

                // Add a computed field for each warehouse stock
                const formattedData = res.map(item => {
                    const imNdWarehouse = item.itemWarehouseInfo.find(warehouse => warehouse.warehouseName === 'IM-ND BOJXONA SKLADI');
                    const yoldagiWarehouse = item.itemWarehouseInfo.find(warehouse => warehouse.warehouseName === "YO'LDAGI SKLAD");
                    const im70BojxonaSkladi = item.itemWarehouseInfo.find(warehouse => warehouse.warehouseName === "IM-70  BOJXONA SKLADI");
                    const bozorSkladi = item.itemWarehouseInfo.find(warehouse => warehouse.warehouseName === "BOZOR SKLADI");
                    const makaronSkladi = item.itemWarehouseInfo.find(warehouse => warehouse.warehouseName === "MAKARON SKLADI");
                    const navesSkladi = item.itemWarehouseInfo.find(warehouse => warehouse.warehouseName === "NAVES SKLADI");
                    const angarSkladi = item.itemWarehouseInfo.find(warehouse => warehouse.warehouseName === "ANGAR SKLADI");
                    return {
                        ...item,
                        imNdInStock: imNdWarehouse ? imNdWarehouse.inStock : 0,
                        yoldagiInStock: yoldagiWarehouse ? yoldagiWarehouse.inStock : 0,
                        im70BojxonaSkladi: im70BojxonaSkladi ? im70BojxonaSkladi.inStock : 0,
                        bozorSkladi: bozorSkladi ? bozorSkladi.inStock : 0,
                        makaronSkladi: makaronSkladi ? makaronSkladi.inStock : 0,
                        navesSkladi: navesSkladi ? navesSkladi.inStock : 0,
                        angarSkladi: angarSkladi ? angarSkladi.inStock : 0
                    };
                });

                setData(formattedData);
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
            title: 'Mahsulot',
            dataIndex: 'itemName',
            key: 'itemName',
            width: '20%',
            fixed: 'left',
            ...getColumnSearchProps('itemName'),
            render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
        },
        {
            title: 'Ombordagi soni',
            dataIndex: 'quantityOnStock',
            key: 'quantityOnStock',
            width: '15%',
            ...getColumnSearchProps('quantityOnStock'),
        },
        {
            title: 'Harid buyurtmasi miqdori',
            dataIndex: 'quantityOrderedFromVendors',
            key: 'quantityOrderedFromVendors',
            width: '15%',
            ...getColumnSearchProps('quantityOrderedFromVendors'),
        },
        {
            title: 'Sotuv buyurtmasi miqdori',
            dataIndex: 'quantityOrderedByCustomers',
            key: 'quantityOrderedByCustomers',
            width: '15%',
            ...getColumnSearchProps('quantityOrderedByCustomers'),
        },
        {
            title: 'Ruxsat etilgan miqdor',
            dataIndex: 'available',
            key: 'available',
            width: '15%',
            ...getColumnSearchProps('available'),
            render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,

        },
        {
            title: 'YO`LDAGI SKLAD',
            dataIndex: 'yoldagiInStock',
            key: 'yoldagiInStock',
            width: '15%',
            ...getColumnSearchProps('yoldagiInStock'),
        },
        {
            title: 'IM-ND BOJXONA SKLADI',
            dataIndex: 'imNdInStock',
            key: 'imNdInStock',
            width: '15%',
            ...getColumnSearchProps('imNdInStock'),
        },
        {
            title: 'IM-70 BOJXONA SKLADI',
            dataIndex: 'im70BojxonaSkladi',
            key: 'im70BojxonaSkladi',
            width: '15%',
            ...getColumnSearchProps('im70BojxonaSkladi'),
        },
        {
            title: 'BOZOR SKLADI',
            dataIndex: 'bozorSkladi',
            key: 'bozorSkladi',
            width: '15%',
            ...getColumnSearchProps('bozorSkladi'),
        },
        {
            title: 'MAKARON SKLADI',
            dataIndex: 'makaronSkladi',
            key: 'makaronSkladi',
            width: '15%',
            ...getColumnSearchProps('makaronSkladi'),
        },
        {
            title: 'NAVES SKLADI',
            dataIndex: 'navesSkladi',
            key: 'navesSkladi',
            width: '15%',
            ...getColumnSearchProps('navesSkladi'),
        },
        {
            title: 'ANGAR SKLADI',
            dataIndex: 'angarSkladi',
            key: 'angarSkladi',
            width: '15%',
            ...getColumnSearchProps('angarSkladi'),
        },
    ];

    return (
        <Layout >
            <div className={'overflow-x-auto w-[1600px]'} >
            <h3 className={'pt-16 pb-10 px-12 text-2xl font-bold border-b-2'}>Ombor hisobi</h3>
          <div >
              <Table
                  className={'py-8 px-8 '}
                  columns={columns}
                  dataSource={data}
                  loading={isLoading}
                  scroll={{ y: 1600 }} // x-axis scroll enabled
              />
          </div>
            </div>
        </Layout>
    );
};

export default WarehouseAccount;
