/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import EditActivityTypeModal from './EditActivityTypeModal.react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenWithMenuToggle from 'ScreenWithMenuToggle.react';
import {useAppContext} from 'App.react';

const {useState} = React;

function EditActivitiesScreen(): React.Element<typeof React.Fragment> {
  const {
    state: {activityTypes},
    dispatch,
  } = useAppContext();
  const [activityBeingEditted, setActivityBeingEditted] = useState(undefined);
  const [
    isEditActivityTypeModalVisible,
    setIsEditActivityTypeModalVisible,
  ] = useState(false);

  return (
    <>
      <EditActivityTypeModal
        activity={activityBeingEditted}
        isVisible={isEditActivityTypeModalVisible}
        onCancel={() => setIsEditActivityTypeModalVisible(false)}
        onSubmit={activityType => {
          const id =
            activityType.id ?? Math.max(0, ...activityTypes.keys()) + 1;
          dispatch({
            type: 'edit_activity_type',
            activityType: {...activityType, id},
          });
          setIsEditActivityTypeModalVisible(false);
        }}
      />
      <ScreenWithMenuToggle
        toolbarContent={<Text style={styles.title}>Edit Activities</Text>}>
        <View style={styles.root}>
          {[...activityTypes.values()].map(activityType => (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('white')}
              onPress={() => {
                setActivityBeingEditted(activityType);
                setIsEditActivityTypeModalVisible(true);
              }}>
              <View key={activityType.id} style={styles.item}>
                <Text style={styles.itemText}>{activityType.name}</Text>
              </View>
            </TouchableNativeFeedback>
          ))}
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('white')}
            onPress={() => {
              setActivityBeingEditted(undefined);
              setIsEditActivityTypeModalVisible(true);
            }}>
            <View style={styles.item}>
              <Icon name="add-circle" color="white" size={48} />
              <Text style={styles.itemText}>Add</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScreenWithMenuToggle>
    </>
  );
}

const styles = StyleSheet.create({
  contextSelector: {
    color: '#FFFFFF',
    height: '100%',
    width: '92%',
  },
  item: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    height: 128,
    justifyContent: 'center',
    margin: 4,
    padding: 8,
    width: 128,
  },
  itemSelected: {
    // borderColor: 'white',
    borderWidth: 3,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  itemTextSelected: {
    color: 'white',
  },
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // height: '100%',
    justifyContent: 'flex-start',
    width: '100%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default EditActivitiesScreen;
