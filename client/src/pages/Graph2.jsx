import React from 'react';
import { useState } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';


<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

// We need to insert bdi scores and time dates into bdiData.x and bdiData.y



function App() {
    const [scores, setScores] = useState([]);
    const [dates, setDates] = useState([]);

    const bdiData = {
        x: dates,
        y: scores,
        type: 'scatter',
        name: "BDI Score"
    }
    
    const heatmap = {
        z: [[1],[2],[3],[4],[5],[6]],
        x: bdiData.x,
        opacity: 0,
        type: 'heatmap',
        colorbar:{
            tickmode: 'array',
            ticktext: ['Minimal', 'Mild', 'Average', 'Moderate', 'Severe', 'Extreme'],
            tickvals: [1,2,3,4,5,6]
        }
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




  return (
    <div>
        <button className='text-white border-2 border-white rounded-lg p-2 uppercase hover:opacity-95' onClick={handleFetch}>
        Fetch
        </button>
        <br/>
    <Plot
        data={[bdiData, heatmap]}
        layout={
            {title: "BDI Scores Timeline",
            xaxis: {
                title: "BDI Test Date",
                range: [bdiData.x[0], bdiData.x[bdiData.x.length - 1]],
                rangeselector: {buttons: [
                {
                    count: 1,
                    label: '1m',
                    step: 'month',
                    stepmode: 'backward'
                },
                {
                    count: 3,
                    label: '3m',
                    step: 'month',
                    stepmode: 'backward'
                },
                {
                    count: 6,
                    label: '6m',
                    step: 'month',
                    stepmode: 'backward'
                },
                {step: 'all'}
                ]},
            rangeslider: {
                visible: true,
                range: [bdiData.x[0], bdiData.x[bdiData.x.length - 1]]
            },
            type: 'date'
            },
            yaxis: { 
                title: "BDI Score",
                autorange: true
            }}
        }
    />
    </div>
    );
}

export default App;