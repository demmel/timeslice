/**
 * @format
 * @flow
 */

import * as React from 'react';
import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import type {ActivityType} from 'App.react';

const {useState, useEffect, useMemo} = React;

type Props = {
  isVisible: boolean,
  activity?: ActivityType,
  onCancel(): void,
  onSubmit(activityType: {
    ...$Diff<ActivityType, {id: number}>,
    id?: number,
  }): void,
};

function EditActivityTypeModal({
  isVisible,
  onCancel,
  onSubmit,
  activity,
}: Props) {
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
      <View style={styles.root}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add New Activity</Text>
          <TextInput
            autoFocus
            style={[styles.text, styles.follow]}
            onChangeText={setName}
            value={name}
          />
          <View style={[styles.buttons, styles.follow]}>
            <View style={styles.button}>
              <Button onPress={onCancel} color="gray" title="Cancel" />
            </View>
            <View style={[styles.button, styles.buttonFollow]}>
              <Button
                onPress={() => {
                  onSubmit({id: activity?.id, name});
                }}
                title="Add"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  modal: {
    backgroundColor: '#424242',
    elevation: 5,
    padding: 8,
    width: '80%',
  },
  root: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
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
