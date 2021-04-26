import React from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import axios from 'utils/axios';

export function useTimelineResume(params = {}) {
  return useQuery('timeline-resume', async () => {
    const { data } = await axios.get(`/api/nodes/resume/`);
    return data;
  });
}

export function useNodes(params = {}) {
  return useQuery(['nodes', params], async () => {
    const { data } = await axios.get(`/api/nodes/`);
    return data;
  });
}
