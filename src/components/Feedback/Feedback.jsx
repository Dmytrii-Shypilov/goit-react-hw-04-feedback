import { useState } from 'react';

import FeedbackOptions from './FeedbackOptions';
import Section from 'components/Section';
import Statistics from './Statistics';
import Notification from 'components/Notification';

const options = ['good', 'neutral', 'bad'];

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = option => {
    setFeedback(prevState => {
      return {
        ...prevState,
        [option]: prevState[option] + 1,
      };
    });
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((feedback.good / countTotalFeedback()) * 100);
  };

  const { good, neutral, bad } = feedback;

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  return (
    <>
      <Section title="Please, leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {!total ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </>
  );
};

export default Feedback;
