/*
 * @Author: xudan
 * @Date: 2024-10-21 10:38:39
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-21 12:20:42
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTopic } from '../api/topicsApi';
interface Part {
  singleItemTitle: string;
  singleItemContent: [];
}
const TopicDetails: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  const [activePart, setActivePart] = useState<number | null>(null);

  const [parts, setParts] = useState<Part[]>([]);
  // const [topicDetails, setTopicDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { id: summaryIndex, subId } = location.state || {};

  useEffect(() => {
    const fetchTopicDetails = async () => {
      try {
        setLoading(true);
        console.log(summaryIndex,subId)
        const response = await getTopic({ id: summaryIndex, subId });
        console.log(response);
        if (response && response.panelItemsList) {
          setParts(response.panelItemsList);
        } else {
          console.error('Invalid response structure:', response);
        }
        console.log(parts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching topic details:', err);
        setError('Failed to fetch topic details. Please try again.');
        setLoading(false);
      }
    };


    fetchTopicDetails();
    
  }, [summaryIndex, subId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  // if (!topicDetails) return <div>No topic details found.</div>;

  const togglePart = (index: number) => {
    setActivePart(activePart === index ? null : index);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* <h1>话题详情: {parts.panelTitle}</h1> */}
      <div className="accordion">
        {parts.map((part:any, index:any) => (
          <div key={index} className="accordion-item">
            <div className="accordion-header" onClick={() => togglePart(index)}>
              {part.singleItemTitle}
            </div>
            <div className={`accordion-content ${activePart === index ? 'active' : ''}`}>
              <ul>
                {part.singleItemContent.map((item:any, i:any) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicDetails;