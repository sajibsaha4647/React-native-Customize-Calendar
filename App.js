import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {CalendarList} from 'react-native-calendars';

const XDate = require('xdate');

const theme = {
  markColor: '#B22727',
  markTextColor: 'white',
  markColor2: '#EE5007',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  let [isRound, setiSRound] = useState(true);
  let [isSelectedTab, setisSelectedTab] = useState('Departure');
  let [isFromDatePicked, setisFromDatePicked] = useState(false);
  let [isToDatePicked, setisToDatePicked] = useState(false);
  let [markedDates, setmarkedDates] = useState({});
  let [markedDatesBackup, setmarkedDatesBackup] = useState({});
  let [fromDate, setfromDate] = useState(null);

  const onDayPress = day => {
    if (
      // (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) &&
      isSelectedTab == 'Departure'
    ) {
      setupStartMarker(day);
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
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <CustomButton
          text={`isRound ${isRound}`}
          action={() => setiSRound(!isRound)}
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
          action={() => setisSelectedTab('Departure')}
        />
        {isRound ? (
          <CustomButton
            text={'Return'}
            action={() => setisSelectedTab('Return')}
          />
        ) : null}
      </View>
      <CalendarList
        theme={theme}
        markingType={'period'}
        current={fromDate}
        markedDates={markedDates}
        onDayPress={day => onDayPress(day)}
      />
    </View>
  );
};

export default App;
