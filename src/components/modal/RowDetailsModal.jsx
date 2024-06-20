import React from 'react';
import { Modal, Table } from 'antd';

const RowDetailsModal = ({ open, onClose, rowData }) => {
    // Define the columns for the table
    const columns = [
        {
            title: 'Maxsulot',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Soni',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'O\'lchov birligi',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: '1kg uchun narx',
            dataIndex: 'pricePerKg',
            key: 'pricePerKg',
        },
        {
            title: 'Jami miqdori',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
        },
        {
            title: 'Jami sotuv narxi',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
    ];

    // Prepare the data for the table from the rowData
    const data = rowData
        ? rowData.documentLines.map((line, index) => ({
            key: index,
            product: line.itemDescription,
            quantity: line.quantity,
            unit: line.measureUnit,
            pricePerKg: `${line.price} ${rowData.docCur}`, // Assuming line.pricePerKg exists
            totalQuantity: line.quantity, // Assuming line.totalQuantity exists
            totalPrice: `${line.lineTotal } ${rowData.docCur}`, // Assuming line.totalPrice exists
        }))
        : [];

    return (
        <Modal
            title={rowData ? `Buyurtma raqami: ${rowData.docNum}` : 'Row Details'}
            visible={open}
            onCancel={onClose}
            footer={null}
            width={1200}
        >
            {rowData && (
                <div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        size="middle"
                    />
                </div>
            )}
        </Modal>
    );
};

export default RowDetailsModal;
