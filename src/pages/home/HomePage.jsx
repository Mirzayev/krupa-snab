import React, {useState} from "react";
import axios from "axios";
import Layout from "../../components/Layout/index.jsx";
import MySales from "../my-sales/MySales.jsx";
import {useNavigate} from "react-router";
import { message } from "antd"


export default function HomePage() {
    const [mySales, setMySales] = useState('')
    const navigate = useNavigate()

    return (
        <Layout>

        </Layout>
    )
}