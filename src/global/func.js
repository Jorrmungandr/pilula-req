import axios from 'axios';

// const axiosGet = async (relativeUrl = '/', component, state = '', callback = () => { }) => {
//   try {
//     const match = document.cookie.match(/(^| )token=([^;]+)/);
    // const res = await axios.get(`http://localhost:3001${relativeUrl}?token=${match[2]}`);
// 		const newState = {};
// 		newState[state] = res.data;
// 		component.setState(newState);
// 		await callback(res, newState);
//   } catch (err) {
//     console.log(err.response.status);
//     if (err.response && err.response.status === 500) {
//     }
//   }
// };

const gel = el => document.querySelector(el);

const axiosGet = async (relativeUrl = '/', component, state = '', callback = () => { }) => {
  try {
		const match = document.cookie.match(/(^| )token=([^;]+)/);
    const res = await axios.get(`http://localhost:3001${relativeUrl}/${match[2]}`);
		const newState = {};
    newState[state] = res.data;
    component.setState(newState);
    await callback(res, newState);
  } catch (err) {
		console.log(err);
  }
};


const axiosPost = async (relativeUrl = '', body = {}, callback = () => { }) => {
	const res = await axios.post(`http://localhost:3001${relativeUrl}`, body);
	callback(res);
}

export {
	gel,
	axiosGet,
	axiosPost,
}
