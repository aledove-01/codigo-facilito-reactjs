import { Button ,Col, Row, Typography } from 'antd';
import { useState, useEffect } from 'react';
import {
    PlusCircleOutlined,
    MinusCircleOutlined
   
  } from '@ant-design/icons';

const CantPasajeros = (props) => {
    //console.log(props)
    const {text, defaultCant, onChange} = props;
    const { Text } = Typography;
    const [cantPasajeros, setCantPasajeros] = useState(parseInt(defaultCant));
    
    useEffect(()=>{
        onChange(cantPasajeros);
    },[cantPasajeros])

    const handlePlus = () => {
        setCantPasajeros(cantPasajeros+1);
       
    }
    const handleMinus = () => {
        if (cantPasajeros >= 1) {
            setCantPasajeros(cantPasajeros-1);
            //onChange(cantPasajeros);
        }
    }
        return (
           
            <div style={{minWidth:'250px', display:'flex',justifyContent:'center'}}>
                <Row>
                    <Col style={{width:'80px', padding: '5% 0'}} >
                        <Text strong style={{paddingRight:'10px',padding: '10% 10px' }}>{text}</Text>
                    </Col>
                    <Col>
                        <Button
                            style={{border: 'none', backgroundColor: 'transparent'}}
                            shape="circle"
                            icon={<MinusCircleOutlined />}
                            //loading={loadings[2]}
                            onClick={handleMinus}
                        />
                        <Text strong  style={{paddingLeft:'8px', paddingRight:'8px' }}>{cantPasajeros}</Text>
                        <Button
                            style={{border: 'none', backgroundColor: 'transparent'}}
                            shape="circle"
                            icon={<PlusCircleOutlined />}
                            //loading={loadings[2]}
                            onClick={handlePlus}
                        />
                        
                    </Col>
                </Row>
            </div>          
        )
}

export default CantPasajeros;

 