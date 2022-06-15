import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {CalendarList, Calendar} from 'react-native-calendars';
import moment from 'moment';
const XDate = require('xdate');

const theme = {
  markColor: '#B22727',
  markTextColor: 'white',
  markColor2: '#EE5007',
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  let [isRound, setiSRound] = useState(true);
  let [isSelectedTab, setisSelectedTab] = useState('Departure');
  let [isFromDatePicked, setisFromDatePicked] = useState(false);
  let [isToDatePicked, setisToDatePicked] = useState(false);
  let [markedDates, setmarkedDates] = useState({});
  let [markedDatesBackup, setmarkedDatesBackup] = useState({});
  let [fromDate, setfromDate] = useState(null);

  let [checkDeparture, setcheckDeparture] = useState(false);

  const onDayPress = day => {
    if (
      // (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) &&
      isSelectedTab == 'Departure'
    ) {
      setupStartMarker(day);

      setcheckDeparture(true);
    } else if (
      // !isToDatePicked &&
      isSelectedTab == 'Return'
    ) {
      let mkDates = {...markedDatesBackup};
      let [mMarkedDates, range] = setupMarkedDates(
        fromDate,
        day.dateString,
        mkDates,
      );

      console.warn(mMarkedDates, 'mMarkedDates');
      console.warn(range, 'range');
      console.warn(fromDate, 'fromDate');
      console.warn(day.dateString, 'dateString');
      console.warn(mkDates, 'mkDates');

      if (range >= 0) {
        setisFromDatePicked(true);
        setisToDatePicked(true);
        setmarkedDates({...markedDatesBackup, ...mMarkedDates});
      } else {
        setupStartMarker(day);
      }
    }
  };

  const setupStartMarker = day => {
    let mkDates = {
      [day.dateString]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    };
    setisFromDatePicked(true);
    setisToDatePicked(false);
    setfromDate(day.dateString);
    setmarkedDates(mkDates);
    setmarkedDatesBackup(mkDates);
  };

  const setupMarkedDates = (fromDate, toDate, mkDates) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        mkDates = {
          [toDate]: {
            color: theme.markColor,
            textColor: theme.markTextColor,
          },
        };
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            mkDates[tempDate] = {
              color: theme.markColor2,
              textColor: theme.markTextColor,
            };
          } else {
            mkDates[tempDate] = {
              endingDay: true,
              color: theme.markColor,
              textColor: theme.markTextColor,
            };
          }
        }
      }
    }
    return [mkDates, range];
  };

  const CustomButton = ({text, action}) => (
    <TouchableOpacity
      onPress={action}
      style={{
        width: 200,
        height: 80,
        backgroundColor: isSelectedTab === text ? 'green' : '#eee',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          color: isSelectedTab === text ? '#FFF' : '#111',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.centeredView}>
      <View style={{alignItems: 'center'}}>
        <CustomButton
          text={`isRound ${isRound}`}
          action={() => {
            setiSRound(!isRound);

            setisFromDatePicked(false);
            setisToDatePicked(false);
            setmarkedDates({});
            setmarkedDatesBackup({});
            setfromDate(null);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CustomButton
          text={'Departure'}
          action={() => {
            setisSelectedTab('Departure');
            setModalVisible(true);
          }}
        />
        {isRound ? (
          <CustomButton
            text={'Return'}
            action={() => {
              if (checkDeparture == false) {
                ToastAndroid.showWithGravity(
                  'Please select departure date first',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              } else {
                setisSelectedTab('Return');
                setModalVisible(true);
              }
            }}
          />
        ) : null}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <CalendarList
          minDate={moment(new Date()).format('YYYY-MM-DD')}
          theme={theme}
          markingType={'period'}
          current={fromDate}
          markedDates={markedDates}
          onDayPress={day => onDayPress(day)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default App;
