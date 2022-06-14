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
  const [statedate, setState] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={[styles.button, styles.buttonOpen, {marginVertical: 30}]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Dismiss modal</Text>
        </Pressable>
        <CalendarList
          style={{}}
          onVisibleMonthsChange={months => {
            console.log('now these months are visible', months);
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          minDate={moment(new Date()).format('YYYY-MM-DD')}
          onDayPress={day => {
            console.warn(day, 'newday');
            // let newday = day.split('T')[0];

            setState({
              [day.dateString]: {selected: true, selectedColor: 'blue'},
              // "[day.dateString]": {selected: true, selectedColor: 'blue'},
            });
          }}
          markedDates={statedate}
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
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Departure date</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Return date</Text>
      </Pressable>
    </View>
  );
};

export default App;
