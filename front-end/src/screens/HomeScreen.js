import React, { useEffect } from 'react'
import {Row,Col} from "react-bootstrap"
import Product from '../components/Product'
import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import axios from "axios"
// import products from '../products'
const HomeScreen = () => {
   // const [products,setProducts] = useState([])
const dispatch = useDispatch()

const productList =useSelector(state => state.productList)
const {loading,error,products} =productList

useEffect(()=>{
   dispatch(listProducts())
// const fetchData = async () =>{
//    const {data}= await axios.get(`/api/products`)
//    setProducts(data)
//    console.log({data});
// }
// fetchData()
},[dispatch])

  return (
   <>
<h1>LATEST PRODUCTS</h1>
{loading ? (<Loader/>) : error ? <Message variant="danger">{error}</Message> : <Row>
  {products && products?.map((product)=>{
    return(
 <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
    <Product product ={product} />
 </Col>
    )
  }) 
  
 }
</Row>}


   </>
  )
}

export default HomeScreen