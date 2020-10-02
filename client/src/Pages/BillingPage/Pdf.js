import React from 'react'
import { Button } from 'antd';
import { useSelector } from 'react-redux'
import  axios from 'axios';
import { saveAs } from 'file-saver';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function Payment(props) {
    const transactionData = useSelector(state => state.transaction.transactionData);
    const {transaction : { customerName } } = transactionData;


    const createAndDownloadPdf = ()=>{
        const payload = {
            RecieptNo: props.match.params.transactionId,
            data: transactionData.transaction
        }

        axios.post('/api/transaction/createPdf', payload)
        .then(response => {
            console.log(response.data)
            if(response.data.success===true){
              console.log("Successfully")
              NotificationManager.success('Bill Generated Click On Download');
              
            }
          })
        // if(response.statuscode===200){
        //     NotificationManager.success('Success');
        // }
        
        // .then(() => axios.get('/api/transaction/fetchPdf', { responseType: 'blob' }))
        // .then((res) => {
        //     const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        //     saveAs(pdfBlob, 'generatedDocument.pdf')
        // } )
    }

    const billDownload=()=>{
        axios.get('/api/transaction/fetchPdf',{responseType:'blob'})
        .then((res)=>{

            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'generatedDocument.pdf')
            
        })
    }


    return (
        <div style={{maxWidth: '85%', margin: '2rem auto'}}>
           <div style={{ textAlign: 'center', fontStyle: 'italic'}}>
              
            </div>
            <div>
               <h2>Billing Success,Transaction Id: &nbsp;&nbsp;
                   <span style={{color: 'blue', fontStyle: 'underline'}}>
                       {props.match.params.transactionId}
                    </span>
                </h2>
            <div style={{textAlign: "center"}}>
                <Button
                 type="primary"
                 onClick={createAndDownloadPdf}
                 >Generate Reciept</Button>
            </div>
            <br/>
            <br/>
            
            <div style={{textAlign: "center"}}>
                <Button
                 type="primary"
                 onClick={billDownload}
                 >Download Reciept</Button>
            </div>
           </div>

           <NotificationContainer/>
           
        </div>
    )
}

export default Payment