// frontend/screens/EventListScreen.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { client } from '../graphql/client';
import { GET_EVENTS } from '../graphql/queries';

type Event = {
  id: string;
  name: string;
  location: string;
  startTime: string;
};

type EventsData = {
  events: Event[];
};

export default function EventListScreen({ navigation }: any) {
  const { data, isLoading, error } = useQuery<EventsData>({
    queryKey: ['events'],
    queryFn: () => client.request<EventsData>(GET_EVENTS),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) {
  console.error('Error fetching events:', error);
  return <Text>Error loading events</Text>;
  }

  return (
    <FlatList
      data={data?.events || []}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('EventDetail', { event: item })}>
          <View style={{ padding: 15, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>{item.location}</Text>
            <Text>{new Date(item.startTime).toLocaleString()}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}