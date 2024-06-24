import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, message, Spin } from 'antd';
import API from "../../store/API.jsx";

const AddOrder = ({ open, onClose, fetchData }) => {
    const [form] = Form.useForm();
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lineItems, setLineItems] = useState([{ key: 0, totalPrice: 0 }]); // Initial line item

    useEffect(() => {
        if (open) {
            fetchCustomers();
            fetchProducts();
            fetchWarehouses();
        }
    }, [open]);

    const fetchCustomers = async () => {
        setIsLoading(true);
        try {
            const response = await API.get('/businesspartners/mijozlar');
            if (response.data && Array.isArray(response.data)) {
                setCustomers(response.data);
            } else {
                message.error('Failed to load customers');
            }
        } catch (error) {
            message.error('Failed to load customers');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await API.get('/items');
            if (response.data && Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                message.error('Failed to load products');
            }
        } catch (error) {
            message.error('Failed to load products');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchWarehouses = async () => {
        setIsLoading(true);
        try {
            const response = await API.get('/warehouses');
            if (response.data && Array.isArray(response.data)) {
                setWarehouses(response.data);
            } else {
                message.error('Failed to load warehouses');
            }
        } catch (error) {
            message.error('Failed to load warehouses');
        } finally {
            setIsLoading(false);
        }
    };

    const handleValuesChange = (changedValues, allValues) => {
        const newLineItems = lineItems.map(item => {
            const quantity = allValues[`quantity_${item.key}`] || 0;
            const pricePerKg = allValues[`pricePerKg_${item.key}`] || 0;
            const totalPrice = pricePerKg * quantity;
            return { ...item, totalPrice };
        });
        setLineItems(newLineItems);
    };

    const handleProductChange = (value, option, key) => {
        const product = products.find(prod => prod.itemCode === value);
        const pricePerKg = product ? product.itemPrice.price : 0; // Fetching price from itemPrice
        form.setFieldsValue({
            [`pricePerKg_${key}`]: pricePerKg
        });
    };

    const addLineItem = () => {
        const newKey = lineItems.length; // Generate unique key
        setLineItems([...lineItems, { key: newKey, totalPrice: 0 }]);
    };

    const removeLineItem = (key) => {
        const updatedItems = lineItems.filter(item => item.key !== key);
        setLineItems(updatedItems);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            const payload = {
                cardCode: values.customer,
                documentsOwner: 12, // Example owner code
                salesPersonCode: "5", // Example sales person code
                documentLines: lineItems.map((item, index) => ({
                    lineNum: index,
                    itemCode: values[`product_${item.key}`],
                    quantity: values[`quantity_${item.key}`].toString(),
                    unitPrice: values[`pricePerKg_${item.key}`],
                    warehouseCode: values[`warehouse_${item.key}`],
                    currency: 'USD' // Example currency
                }))
            };

            API.post('/yangisotuvyaratish', payload)
                .then(response => {
                    if (response.status === 200) {
                        message.success('Muvaffaqiyatli yuborildi!');
                        form.resetFields();
                        setLineItems([{ key: 0, totalPrice: 0 }]); // Reset line items
                        fetchData();
                        onClose();
                    } else {
                        message.error('Yuborishda xato yuz berdi!');
                    }
                })
                .catch(error => {
                    message.error('Yuborishda xato yuz berdi!');
                    console.error('Error:', error);
                });
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    return (
        <Modal
            title="Sotuv qo'shish"
            visible={open}
            onOk={handleSubmit}
            onCancel={onClose}
            okButtonProps={{ disabled: isLoading }}
        >
            {isLoading ? (
                <Spin tip="Yuklanmoqda...">
                    <div style={{ height: '300px' }} />
                </Spin>
            ) : (
                <>
                    <Form
                        form={form}
                        layout="vertical"
                        onValuesChange={handleValuesChange}
                    >
                        <Form.Item
                            name="customer"
                            label="Mijoz"
                            rules={[{ required: true, message: 'Iltimos, mijozni tanlang!' }]}
                        >
                            <Select>
                                {customers.map(customer => (
                                    <Select.Option key={customer.id} value={customer.cardCode}>
                                        {customer.cardName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        {lineItems.map(item => (
                            <div key={item.key} style={{ marginBottom: '16px' }}>
                                <Form.Item
                                    name={`product_${item.key}`}
                                    label="Maxsulot"
                                    rules={[{ required: true, message: 'Iltimos, maxsulotni tanlang!' }]}
                                >
                                    <Select onChange={(value, option) => handleProductChange(value, option, item.key)}>
                                        {products.map(product => (
                                            <Select.Option key={product.id} value={product.itemCode}>
                                                {product.itemName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name={`pricePerKg_${item.key}`}
                                    label="1kg uchun narx"
                                    rules={[{ required: true, message: 'Iltimos, narxni kiriting!' }]}
                                >
                                    <InputNumber
                                        min={0}
                                        style={{ width: '100%' }}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\s?|(\,*)/g, '')}
                                        disabled
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={`quantity_${item.key}`}
                                    label="Soni"
                                    rules={[{ required: true, message: 'Iltimos, sonini kiriting!' }]}
                                >
                                    <InputNumber min={0} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Summa"
                                >
                                    <Input value={`${item.totalPrice} UZS`} disabled />
                                </Form.Item>
                                <Form.Item
                                    name={`warehouse_${item.key}`}
                                    label="Ombor"
                                    rules={[{ required: true, message: 'Iltimos, omborni tanlang!' }]}
                                >
                                    <Select>
                                        {warehouses.map(warehouse => (
                                            <Select.Option key={warehouse.id} value={warehouse.warehouseName}>
                                                {warehouse.warehouseName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {item.key !== 0 && (
                                    <Button type="danger" onClick={() => removeLineItem(item.key)}>Remove</Button>
                                )}
                            </div>
                        ))}
                    </Form>
                    <Button type="primary" onClick={addLineItem}>+</Button>
                </>
            )}
        </Modal>
    );
};

export default AddOrder;
