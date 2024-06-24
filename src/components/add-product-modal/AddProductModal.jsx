import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, message, Spin } from 'antd';
import API from "../../store/API.jsx";

const AddProductModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [totalPrice, setTotalPrice] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [salesEmployees, setSalesEmployees] = useState([]);
    const [loadingCustomers, setLoadingCustomers] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingSalesEmployees, setLoadingSalesEmployees] = useState(false);
    const [documentsOwner, setDocumentsOwner] = useState(14);
    const [currency, setCurrency] = useState('UZS');

    useEffect(() => {
        if (open) {
            fetchCustomers();
            fetchProducts();
            fetchSalesEmployees();
            fetchDocumentsOwner();
        }
    }, [open]);

    const fetchCustomers = async () => {
        setLoadingCustomers(true);
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
            setLoadingCustomers(false);
        }
    };

    const fetchProducts = async () => {
        setLoadingProducts(true);
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
            setLoadingProducts(false);
        }
    };

    const fetchSalesEmployees = async () => {
        setLoadingSalesEmployees(true);
        try {
            const response = await API.get('/salesemployees');
            if (response.data && Array.isArray(response.data)) {
                setSalesEmployees(response.data);
            } else {
                message.error('Failed to load sales employees');
            }
        } catch (error) {
            message.error('Failed to load sales employees');
        } finally {
            setLoadingSalesEmployees(false);
        }
    };

    const fetchDocumentsOwner = async () => {
        try {
            const response = await API.get('/someendpoint'); // Replace with the correct endpoint
            if (response.data && response.data.documentsOwner) {
                setDocumentsOwner(response.data.documentsOwner);
            }
        } catch (error) {
            // Silently fail, using the default value
        }
    };

    const handleValuesChange = (changedValues, allValues) => {
        const pricePerKg = allValues.pricePerKg || 0;
        const quantity = allValues.quantity || 0;
        setTotalPrice(pricePerKg * quantity);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            const payload = {
                cardCode: values.customer,
                docDueDate: new Date().toISOString().split('T')[0], // Using the current date for example
                documentsOwner: documentsOwner,
                salesPersonCode: values.responsiblePerson,
                docCurrency: values.currency,
                documentLines: [
                    {
                        lineNum: 0,
                        itemCode: products.find(prod => prod.itemName === values.productName)?.itemCode,
                        quantity: values.quantity,
                        unitPrice: values.pricePerKg,
                        currency: values.currency
                    }
                ]
            };

            API.post('/salesorder', payload)
                .then(response => {
                    if (response.status === 200) {
                        message.success('Muvaffaqiyatli yuborildi!');
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

    const isLoading = loadingCustomers || loadingProducts || loadingSalesEmployees;

    return (
        <Modal
            title="Maxsulot qo'shish"
            visible={open}
            onOk={handleSubmit}
            onCancel={onClose}
            okButtonProps={{ disabled: isLoading }}
        >
            {isLoading ? (
                <Spin tip="Loading...">
                    <div style={{ height: '300px' }} />
                </Spin>
            ) : (
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
                                <Select.Option key={customer.cardCode} value={customer.cardCode}>
                                    {customer.cardName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="productName"
                        label="Maxsulot"
                        rules={[{ required: true, message: 'Iltimos, maxsulot nomini kiriting!' }]}
                    >
                        <Select>
                            {products.map(product => (
                                <Select.Option key={product.id} value={product.itemName}>
                                    {product.itemName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="pricePerKg"
                        label="1kg uchun narx"
                        rules={[{ required: true, message: 'Iltimos, narxni kiriting!' }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\s?|(\,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Soni"
                        rules={[{ required: true, message: 'Iltimos, sonini kiriting!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Umumiy narx"
                    >
                        <Input value={`${totalPrice} ${currency}`} disabled />
                    </Form.Item>
                    <Form.Item
                        name="responsiblePerson"
                        label="Ma'sul shaxs"
                        rules={[{ required: true, message: 'Iltimos, ma\'sul shaxsni tanlang!' }]}
                    >
                        <Select>
                            {salesEmployees.map(employee => (
                                <Select.Option key={employee.slpCode} value={employee.slpCode}>
                                    {employee.slpName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="currency"
                        label="Valuta"
                        initialValue="UZS"
                        rules={[{ required: true, message: 'Iltimos, valutani tanlang!' }]}
                    >
                        <Select onChange={value => setCurrency(value)}>
                            <Select.Option value="UZS">UZS</Select.Option>
                            <Select.Option value="USD">USD</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default AddProductModal;
