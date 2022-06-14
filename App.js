import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const App = () => {
  // '2022-06-23': {
  //   selected: true,
  //   endingDay: true,
  //   backgroundColor: 'green',
  //   selectedColor: 'gray',
  // },
  // '2022-06-28': {
  //   selected: true,
  //   endingDay: true,
  //   backgroundColor: 'green',
  //   selectedColor: 'gray',
  // },
  let [markedDate, setMarkedDate] = useState({});
  let [departure, setDep] = useState({});
  let [returndt, setRetun] = useState({});

  const [DepartureDate, setDepartureDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [ReturnDate, setReturnDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [ActiveDate, setActiveDate] = useState('Departure');

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(DepartureDate)}</Text>
      <Text>{JSON.stringify(ReturnDate)}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{marginBottom: 20}}>
          <Pressable
            style={[styles.button, styles.buttonOpen, {marginVertical: 30}]}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.textStyle}>Dismiss modal</Text>
            <Text>{JSON.stringify(DepartureDate)}</Text>
          </Pressable>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                setActiveDate('Departure');
              }}>
              <Text style={styles.textStyle}>departure modal</Text>
              <Text>{JSON.stringify(DepartureDate)}</Text>
            </Pressable>
          </View>
          <View style={{flex: 1}}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                setActiveDate('Return');
              }}>
              <Text style={styles.textStyle}>return modal</Text>
              <Text>{JSON.stringify(ReturnDate)}</Text>
            </Pressable>
          </View>
        </View>
        <CalendarList
          style={{}}
          minDate={moment(new Date()).format('YYYY-MM-DD')}
          markingType={'period'}
          onDayPress={day => {
            if (ActiveDate == 'Departure') {
              let x = {};
              x[day.dateString] = {
                startingDay: true,
                color: '#50cebb',
                textColor: 'red',
              };
              setDep(x);
              let key = Object.keys(returndt)[0];
              console.log(key);
              x[key] = {
                endingDay: true,
                color: '#50cebb',
                textColor: 'red',
              };
              setMarkedDate(x);
            } else if (ActiveDate == 'Return') {
              let x = {};
              x[day.dateString] = {
                endingDay: true,
                color: '#50cebb',
                textColor: 'red',
              };
              setRetun(x);
              let key = Object.keys(departure)[0];
              console.log(key);
              x[key] = {
                startingDay: true,
                color: '#50cebb',
                textColor: 'red',
              };

              let startSplit = key.split('-');
              let startDay = startSplit[2];
              let startMonth = startSplit[1];
              let startYear = startSplit[0];

              let endSplit = day.dateString.split('-');
              let endDay = endSplit[2];
              let endMonth = endSplit[1];
              let endYear = endSplit[0];

              // for()

              setMarkedDate(x);
            }
          }}
          markedDates={markedDate}
          // markedDates={
          //   ActiveDate == ''
          //     ? DepartureDate
          //     : ActiveDate == 'Departure'
          //     ? DepartureDate
          //     : ReturnDate
          // }
          // renderHeader={date => {
          //   console.warn(date, 'check date');
          //   return <Text>{moment(date).format('YYYY-MM-DD')}</Text>;
          // }}
          // Set custom calendarWidth.
          calendarWidth={width}
        />
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen, {marginBottom: 30}]}
        onPress={() => {
          setActiveDate('Departure');
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Departure date</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setActiveDate('Return');
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Return date</Text>
      </Pressable>
    </View>
  );
};

export default App;
