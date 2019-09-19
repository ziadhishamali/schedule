import React, { Component } from 'react';
import Table from './Table';
import firebase from './Firebase';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getUniqueID = () => {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            // eslint-disable-next-line no-mixed-operators
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    sleep = (milliseconds) => {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }

    componentDidMount() {
        const db = firebase.firestore();
        console.log(db);
        let csedRef = db.collection('CSED21');

        // this was for writing the whole table from here to the firestore
        /*for (let i = 0; i < this.state.data.length; i++) {
            let uid = this.getUniqueID()
            csedRef.doc(uid).set({
                day: i,
                content: this.state.data[i],
            })
        }*/

        csedRef.orderBy("day", "asc").onSnapshot(querySnapshot => {
            let data = [];
            querySnapshot.forEach(doc => {
                data[doc.data().day] = doc.data().content;
            })
            this.setState({data});
        })
    }

    render() { 
        return (
            <div className="home flex-column justify align">
                <Table data={this.state.data} />
            </div>            
        );
    }
}
 
export default Home;