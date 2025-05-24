import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

type Item = {
  id: number;
  title: string;
  // other item properties
};

const ApiWithDynamicId = ({ itemId }: { itemId: number }) => {
  const [data, setData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.example.com/items/${itemId}`,
          {
            signal: abortController.signal,
            headers: {
              'Content-Type': 'application/json',
              // Add other headers if needed
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [itemId]); // Re-run when itemId changes

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;
  if (!data) return <Text>No data found</Text>;

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{data.title}</Text>
      {/* Render other data properties */}
    </View>
  );
};

export default ApiWithDynamicId;