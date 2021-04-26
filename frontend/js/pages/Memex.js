import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { maxBy, get, unset } from 'lodash';
import { BsSearch } from 'react-icons/bs';
import { FcOk } from 'react-icons/fc';
import styled from 'styled-components';

import { useNodes, useTimelineResume } from 'hooks/useMemex';

const VerticalTimelineHistogram = () => {
  const { data: entries, isLoading } = useTimelineResume();
  const maxValue = get(maxBy(entries, 'count'), 'count');

  if (isLoading) {
    return null;
  }
  return (
    <div style={{ width: '100px', marginTop: '100px', position: 'fixed' }}>
      {entries.map((item) => {
        const lineWidth = item.count === maxValue ? '100%' : `${(100 * item.count) / maxValue}%`;
        return (
          <div style={{ width: lineWidth, borderTop: '3px solid #555555', marginBottom: '4px' }} />
        );
      })}
    </div>
  );
};

const EventLogCard = ({ log }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        margin: '10px 60px 10px 40px',
        borderRadius: '5px',
        boxShadow: '2px 2px 5px #d8dbdf',
        textAlign: 'left',
        padding: '20px 30px',
        marginTop: '5px',
      }}
    >
      <p>{log.device_name}</p>
      <h5>{log.command}</h5>
      <p>{log.date} </p>
    </div>
  );
};

const Block = styled.div`
  // display: flex;
  font-family: Monospace;

  &:before {
    /* this is the vertical line */
    content: '';
    position: absolute;
    top: 0;
    left: 150px;
    bottom: 0;
    width: 4px;
    background: #555555;
  }
`;

const AcitivitiesTimeline = styled.div`
  max-width: 1170px;
  margin: 0 auto 0 139px;
  position: relative;
  padding: 2em 0;
  box-sizing: border-box;
`;

const EventLogActivity = ({ log }) => {
  return (
    <div style={{ position: 'relative', margin: '2em 0' }}>
      <EventLogCard log={log} />
      <FcOk
        style={{
          position: 'absolute',
          width: '25px',
          height: '25px',
          right: 'unset',
          left: '0',
          display: 'block',
          top: '50%',
        }}
      />
    </div>
  );
};

const SearchLogs = () => {
  return (
    <div style={{ margin: '30px auto 20px auto' }}>
      <div
        style={{
          position: 'relative',
          fontSize: '18px',
          left: '5%',
        }}
      >
        <BsSearch
          style={{
            width: '18px',
            height: '18px',
            position: 'absolute',
            color: 'white',
            margin: '17px',
          }}
        />
        <input
          style={{
            backgroundColor: 'black',
            color: 'white',
            display: 'block',
            width: '90%',
            height: '50px',
            paddingLeft: '45px',
          }}
        ></input>
      </div>
    </div>
  );
};

export const Memex = () => {
  const { data, isLoading } = useNodes();
  const logs = get(data, 'results');

  if (isLoading) {
    return null;
  }

  return (
    <Block>
      <SearchLogs />
      <VerticalTimelineHistogram />
      <AcitivitiesTimeline>
        <h4 style={{ marginLeft: '40px', marginBottom: '25px', textAlign: 'left' }}>
          Sunday, April 2, 2021
        </h4>
        {logs.map((log) => {
          return <EventLogActivity log={log} />;
        })}
      </AcitivitiesTimeline>
    </Block>
  );
};
