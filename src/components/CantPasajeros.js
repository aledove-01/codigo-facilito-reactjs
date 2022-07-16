import { Button ,Col, Row, Typography } from 'antd';
import { useState } from 'react';
import {
    PlusCircleOutlined,
    MinusCircleOutlined
   
  } from '@ant-design/icons';

const CantPasajeros = (props) => {
    //console.log(props)
    const {text, defaultCant, onChange} = props;
    const { Text } = Typography;
    const [cantPasajeros, setCantPasajeros] = useState(parseInt(defaultCant));
    const handlePlus = () => {
        setCantPasajeros(cantPasajeros+1);
        onChange(cantPasajeros);
    }
    const handleMinus = () => {
        if (cantPasajeros >= 1) {
            setCantPasajeros(cantPasajeros-1);
            onChange(cantPasajeros);
        }
    }
        return (
           
            <>
                <Row>
                    <Col style={{width:'80px', padding: '5% 0'}} >
                        <Text strong style={{paddingRight:'10px',padding: '10% 10px' }}>{text}</Text>
                    </Col>
                    <Col>
                        <Button
                            style={{border: 'none', backgroundColor: 'transparent'}}
                            shape="circle"
                            icon={<PlusCircleOutlined />}
                            //loading={loadings[2]}
                            onClick={handlePlus}
                        />
                        <Text strong  style={{paddingLeft:'8px', paddingRight:'8px' }}>{cantPasajeros}</Text>
                        <Button
                            style={{border: 'none', backgroundColor: 'transparent'}}
                            shape="circle"
                            icon={<MinusCircleOutlined />}
                            //loading={loadings[2]}
                            onClick={handleMinus}
                        />
                    </Col>
                </Row>
            </>          
        )
}

export default CantPasajeros;

 