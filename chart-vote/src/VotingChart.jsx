import Chart from "chart.js/auto";
import {useRef, useState, useEffect} from "react";

export default function VotingChart() {

    const [vote, setVote] = useState([{id: 0, data: 0}, {id: 1, data: 0}]);
    const optionOne = "Red button";
    const optionTwo = "Blue button";

    const canvasRef = useRef();
    const chartInstanceRef = useRef();
    
    const handleClick = (id) => {
        setVote(vote.map(item =>
            item.id === id ? { ...item, data: item.data + 1} : item
        ));
    }

    useEffect(() => {
        const voteNumbers = vote.map(item => item.data);

        if (!chartInstanceRef.current){

            chartInstanceRef.current = new Chart(canvasRef.current, {
                type: 'bar',
                data: {
                    labels: [optionOne, optionTwo],
                    datasets: [{
                        data: voteNumbers,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
            });
        }
        else{
            chartInstanceRef.current.data.datasets[0].data = voteNumbers;
            chartInstanceRef.current.update();
        }

        // This teardown action is needed to prevent multiple instances of the chart from sharing the same canvas
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        }
    }, [vote]);

    return (
        <div>
            <div>
            <canvas ref={canvasRef}></canvas>
            </div>
            <button onClick={() => handleClick(0)} >Red button</button>
            <button onClick={() => handleClick(1)} >Blue button</button>
        </div>
    );
}