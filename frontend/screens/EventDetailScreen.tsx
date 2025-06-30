import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { client } from '../graphql/client';
import { JOIN_EVENT } from '../graphql/mutations';
import { useEventStore } from '../store/eventStore';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function EventDetailScreen({ route }: any) {
  const { event } = route.params;
  const [attendees, setAttendees] = useState<any[]>([]);
  const setJoinedEventId = useEventStore((s) => s.setJoinedEventId);

  const mutation = useMutation({
    mutationFn: () => client.request(JOIN_EVENT, { eventId: event.id }),
    onSuccess: () => {
      setJoinedEventId(event.id);
    },
  });

  useEffect(() => {
    socket.emit('joinRoom', event.id);
    socket.on('attendeeUpdate', (data) => {
      if (data.eventId === event.id) {
        setAttendees(data.attendees);
      }
    });
    return () => {
      socket.off('attendeeUpdate');
    };
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>{event.name}</Text>
      <Text>{event.location}</Text>
      <Text>{new Date(event.startTime).toLocaleString()}</Text>
      <Button title="Join Event" onPress={() => mutation.mutate()} />
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Attendees:</Text>
      <FlatList
        data={attendees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ marginTop: 5 }}>{item.name} ({item.email})</Text>
        )}
      />
    </View>
  );
}