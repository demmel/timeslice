/**
 * @format
 * @flow
 */

import * as React from 'react';
import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import appStyles from 'styles';
import type {ActivityType} from 'types';

const {useState, useEffect, useMemo} = React;

type Props = {
  isVisible: boolean,
  activity?: ActivityType,
  onCancel(): void,
  onSubmit(activityType: {
    ...$Diff<ActivityType, {id: number}>,
    id?: number,
  }): void,
  onRemove?: (id: number) => void,
};

function EditActivityTypeModal({
  isVisible,
  onCancel,
  onSubmit,
  activity,
  onRemove,
}: Props) {
  const isEdit = activity != null;
  const initialState = useMemo(
    () =>
      activity ?? {
        name: '',
      },
    [activity],
  );
  const [name, setName] = useState(initialState.name);
  useEffect(() => {
    setName(initialState.name);
  }, [initialState]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}>
      <View style={[appStyles.fillParent, appStyles.centerContent]}>
        <View style={styles.background} />
        <View style={appStyles.dialog}>
          <Text style={styles.title}>
            {isEdit ? 'Edit Activity' : 'Add New Activity'}
          </Text>
          <TextInput
            autoFocus
            style={[styles.text, styles.follow]}
            onChangeText={setName}
            value={name}
          />
          <View style={[styles.buttons, styles.follow]}>
            {activity != null && onRemove && (
              <View style={styles.button}>
                <Button
                  onPress={() => {
                    onRemove(activity.id);
                  }}
                  color="red"
                  title="Remove"
                />
              </View>
            )}
            <View style={[styles.button, styles.buttonFollow]}>
              <Button onPress={onCancel} color="gray" title="Cancel" />
            </View>
            <View style={[styles.smallButton, styles.buttonFollow]}>
              <Button
                onPress={() => {
                  onSubmit({id: activity?.id, name});
                }}
                title={isEdit ? 'Save' : 'Add'}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    ...appStyles.fillParent,
    backgroundColor: 'black',
    opacity: 0.75,
    position: 'absolute',
  },
  button: {
    flex: 1,
  },
  buttonFollow: {marginStart: 8},
  buttons: {
    flexDirection: 'row',
    width: '100%',
  },
  follow: {
    marginTop: 8,
  },
  smallButton: {
    flex: 0.7,
  },
  text: {
    backgroundColor: '#212121',
    color: 'white',
    fontSize: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EditActivityTypeModal;
