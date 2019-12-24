/**
 * @format
 * @flow
 */

import * as React from 'react';
import {ScrollView, Text} from 'react-native';
import {useAppContext} from 'App.react';
import ActivityGrid from 'components/ActivityGrid.react';
import EditActivityTypeModal from './EditActivityTypeModal.react';
import ScreenWithMenuToggle from 'ScreenWithMenuToggle.react';
import appStyles from 'styles';

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
            activityType: {...activityType, id},
            type: 'edit_activity_type',
          });
          setIsEditActivityTypeModalVisible(false);
        }}
      />
      <ScreenWithMenuToggle
        toolbarContent={
          <Text style={appStyles.toolbarText}>Edit Activities</Text>
        }>
        <ScrollView>
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
        </ScrollView>
      </ScreenWithMenuToggle>
    </>
  );
}

export default EditActivitiesScreen;
