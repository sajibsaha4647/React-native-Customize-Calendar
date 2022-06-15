// import moment from 'moment';
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Modal,
//   Pressable,
//   Alert,
// } from 'react-native';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// const width = Dimensions.get('screen').width;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

// const App = () => {
//   let [markedDate, setMarkedDate] = useState({});
//   let [departure, setDep] = useState({});
//   let [returndt, setRetun] = useState({});

//   const [DepartureDate, setDepartureDate] = useState(
//     moment(new Date()).format('YYYY-MM-DD'),
//   );
//   const [ReturnDate, setReturnDate] = useState(
//     moment(new Date()).format('YYYY-MM-DD'),
//   );

//   const [modalVisible, setModalVisible] = useState(false);
//   const [ActiveDate, setActiveDate] = useState('Departure');

//  const createDateRange=(startDate, endDate) =>{
//     startDate = moment(startDate).format('YYYY-MM-DD');
//     endDate = moment(endDate).format('YYYY-MM-DD');
//       const dateRange = {
//         [startDate]: { selected: true, startingDay: true, color: 'green' },
//         [endDate]: { selected: true, endingDay: true, color: 'green' },
//       };
//       if (startDate && endDate) {
//         let start = moment(startDate).startOf('day').add(1, 'days');
//         const end = moment(endDate).startOf('day');
//         while (end.isAfter(start)) {
//           Object.assign(dateRange, { [start.format('YYYY-MM-DD')]: { selected: true, color: 'green' } });
//           start = start.add(1, 'days');
//         }
//       }
//       return dateRange;
//     }

//   return (
//     <View style={styles.container}>
//       <Text>{JSON.stringify(departure)}</Text>
//       <Text>{JSON.stringify(returndt)}</Text>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           // Alert.alert('Modal has been closed.');
//           // setModalVisible(!modalVisible);
//         }}>
//         <View style={{marginBottom: 20}}>
//           <Pressable
//             style={[styles.button, styles.buttonOpen, {marginVertical: 30}]}
//             onPress={() => {
//               setModalVisible(!modalVisible);
//               console.warn();
//             }}>
//             <Text style={styles.textStyle}>Confirm Date</Text>
//           </Pressable>
//         </View>

//         <View style={{flexDirection: 'row'}}>
//           <View style={{flex: 1}}>
//             <Pressable
//               style={[
//                 styles.button,
//                 {
//                   backgroundColor:
//                     ActiveDate == 'Departure' ? 'black' : 'green',
//                 },
//               ]}
//               onPress={() => {
//                 setActiveDate('Departure');
//               }}>
//               <Text style={styles.textStyle}>departure modal</Text>
//             </Pressable>
//           </View>
//           <View style={{flex: 1}}>
//             <Pressable
//               style={[
//                 styles.button,
//                 {
//                   backgroundColor: ActiveDate == 'Return' ? 'black' : 'green',
//                 },
//               ]}
//               onPress={() => {
//                 setActiveDate('Return');
//               }}>
//               <Text style={styles.textStyle}>return modal</Text>
//             </Pressable>
//           </View>
//         </View>
//         <CalendarList
//           style={{}}
//           minDate={moment(new Date()).format('YYYY-MM-DD')}
//           markingType={'period'}
//           onDayPress={day => {
//             if (ActiveDate == 'Departure') {
//               let x = {};
//               x[day.dateString] = {
//                 startingDay: true,
//                 color: '#50cebb',
//                 textColor: 'red',
//               };
//               setDep(x);
//               let key = Object.keys(returndt)[0];
//               console.log(key);
//               x[key] = {
//                 endingDay: true,
//                 color: '#50cebb',
//                 textColor: 'red',
//               };
//               setMarkedDate(x);
//             } else if (ActiveDate == 'Return') {
//               let x = {};
//               x[day.dateString] = {
//                 endingDay: true,
//                 color: '#50cebb',
//                 textColor: 'red',
//               };
//               setRetun(x);
//               let key = Object.keys(departure)[0];
//               console.log(key);
//               x[key] = {
//                 startingDay: true,
//                 color: '#50cebb',
//                 textColor: 'red',
//               };

//               setMarkedDate(x);
//             }
//           }}
//           markedDates={markedDate}
//           calendarWidth={width}
//         />
//       </Modal>

//       <Pressable
//         style={[styles.button, styles.buttonOpen, {marginBottom: 30}]}
//         onPress={() => {
//           setActiveDate('Departure');
//           setModalVisible(true);
//         }}>
//         <Text style={styles.textStyle}>Departure date</Text>
//       </Pressable>
//       <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => {
//           setActiveDate('Return');
//           setModalVisible(true);
//         }}>
//         <Text style={styles.textStyle}>Return date</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default App;

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
    };
  }

  setDates = dates => {
    this.setState({
      ...dates,
    });
  };

  render() {
    const {startDate, endDate, displayedDate} = this.state;
    return (
      <View style={styles.container}>
        <DateRangePicker
          onChange={this.setDates}
          endDate={endDate}
          startDate={startDate}
          displayedDate={displayedDate}
          range>
          <Text>Click me!</Text>
        </DateRangePicker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
