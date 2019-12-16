/**
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import ActivityGrid from 'components/ActivityGrid.react';
import EditActivityTypeModal from './EditActivityTypeModal.react';
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
        <ActivityGrid>
          {[...activityTypes.values()].map(activityType => (
            <ActivityGrid.Item
              onPress={() => {
                setActivityBeingEditted(activityType);
                setIsEditActivityTypeModalVisible(true);
              }}
              key={activityType.id}
              text={activityType.name}
            />
          ))}
          <ActivityGrid.Item
            onPress={() => {
              setActivityBeingEditted(undefined);
              setIsEditActivityTypeModalVisible(true);
            }}
            icon="add-circle"
            text="Add"
          />
        </ActivityGrid>
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
