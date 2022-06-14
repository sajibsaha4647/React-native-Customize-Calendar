import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  const [statedate, setState] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(moment(new Date()).add(100, 'years'))}</Text>
      <Text>{JSON.stringify(statedate)}</Text>
      <CalendarList
        style={{}}
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
          setState({
            [day.dateString]: {selected: true, selectedColor: 'blue'},
          });
        }}
        markedDates={statedate}
        renderHeader={date => {
          console.warn(date, 'check date');
          return <Text>{moment(date).format('YYYY-MM-DD')}</Text>;
        }}
        // Set custom calendarWidth.
        calendarWidth={width}
      />
    </View>
  );
};

export default App;
