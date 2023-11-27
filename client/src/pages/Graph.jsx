import React from 'react';
import { useSelector } from 'react-redux';
import {Line} from 'react-chartjs-2';
import { useState, useEffect } from 'react';



export default function Graph(){
    const [scores, setScores] = useState([]);
    const [dates, setDates] = useState([]);
    let state = {
      labels: dates,
      datasets: [
          {
          label: 'Depression Levels',
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: scores
          }
      ]
    }
    const { currentUser } = useSelector((state) => state.user);
    const userId = currentUser.email; // Assuming the user's email is the userId
  
    const handleFetch = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('/api/user/graph', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: userId})
        });
        const data = await res.json();
        const array = data.data
        if (res.ok) {
          setScores(array.map(x => x.score));
          setDates(array.map(x => x.createdAt))
          console.log(state)
        } else {
          console.error('Failed to fetch scores:', data.error);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };
    class App extends React.Component {
      render() {
        return (
          <div>
            <Line
              data={state}
              options={{
                title:{
                  display:true,
                  text:'Average Rainfall per month',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
          </div>
        );
      }
    }
    
  return (<>
  <button className='text-white border-2 border-white rounded-lg p-2 uppercase hover:opacity-95' onClick={handleFetch}>
    Fetch
  </button>
  <App/>
  </>)
}


