import { hasFormSubmit } from '@testing-library/user-event/dist/utils'
import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Spinner from './Spinner'
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification'


const App = () => {

  const [email, setEmail] = useState('');
  const [newN, setNewn] = useState("0")

  const [allNotices, setAllNotices] = useState({ text: [], links: [] })
  const [monthlyNotices, setMonthlyNotices] = useState({ text: [], links: [] })
  let i = -1;
  let j = -1;

  const [allNoticesUSS, setAllNoticesUSS] = useState({ text: [], links: [] })
  const [tittle, settittle] = useState("")
  let iu = -1;

  const onChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // this will prevent reload

    console.log(email);

    const response = await fetch('http://localhost:5000/notifyme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
      body: JSON.stringify({ to: email, new: newN })
    })
    const json = await response.json()
    console.log(json);

  }

  const notify = async (message = "To get notification for latest notices please dont disble notifications for this website") => {

    addNotification({
      title: 'Hello !',
      message: message,
      duration: 80000, //optional, default: 5000, 
      native: true // when using native, your OS will handle theming.  
    });
  }

  const getAll = async () => {

    const response = await fetch('http://localhost:5000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin"
    });


    const json = await response.json();

    if (localStorage.getItem('last' !== json.textC[0])) {
      notify("You have new notices");
      setNewn("1");
    }

    localStorage.setItem('last', json.textC[0]);

    await setAllNotices({ text: json.textC, links: json.linkC })
    await setMonthlyNotices({ text: json.textM, links: json.linkM })

  }


  const getUSS = async (link) => {

    const response = await fetch('http://localhost:5000/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
      body: JSON.stringify({ url: link, authifyEncrytion: "hfef&^@uesuweufwhi909scbdf8834535@@%$" }),
    });

    const json = await response.json();

    if (localStorage.getItem('lastUSS' !== json.textC[0])) {
      notify("You have new notices");
      setNewn("1");
    }

    localStorage.setItem('lastUSS', json.textC[0]);

    console.log(json)
    await setAllNoticesUSS({ text: json.textC, links: json.linkC })

  }


  const usict = async () => {
    settittle("University School of Information, Communication & Technology");
    getUSS("http://ipu.ac.in/notices_usict.php")
  }

  const usms = async () => {
    settittle("University School of Management Studies");
    getUSS("http://www.ipu.ac.in/Notices_usms.php")
  }

  const usct = async () => {
    settittle("University School of Chemical Technology");
    getUSS("http://ipu.ac.in/notices_usct.php")
  }

  const usbt = async () => {
    settittle("University School of Biotechnology");
    getUSS("http://ipu.ac.in/notices_usbt.php")
  }

  const usbas = async () => {
    settittle("University School of Basic & Applied Sciences");
    getUSS("http://ipu.ac.in/notices_usbas.php")
  }

  const uslls = async () => {
    settittle("University School of Law and Legal Studies");
    getUSS("http://ipu.ac.in/notices_USLLS.php")
  }

  const usap = async () => {
    settittle("University School of Architecture & Planing");
    getUSS("http://ipu.ac.in/exam_notices.php")
  }

  const usmphs = async () => {
    settittle("University School of Medicine and Para-Medical Health Sciences");
    getUSS("http://ipu.ac.in/usmphs/notices.php")
  }

  const usmc = async () => {
    settittle("University School of Mass Communication");
    getUSS("http://ipu.ac.in/notices_usmc.php")
  }



  useEffect(() => {

    // notify();


  }, [])


  useEffect(() => {

    if (allNotices.links.length === 0) {
      getAll();
    }
  }, [allNotices])




  return (
    <div>
      <Notifications />
      <nav className='d-flex flex-row justify-content-between border-bottom p-2 bg-theme'>
        <img src="http://ipu.ac.in/style/head_foot_img/220px-usemGuru_Gobind_Singh_Indraprastha_University12.png" alt="" height={32} />
        <div class="dropdown">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Select USS
          </button>
          <ul class="dropdown-menu py-0">
            <li><button className='btn btn-light w-100' onClick={usict}>USICT</button></li>
            <li><button className='btn btn-light w-100' onClick={usms}>USMS</button></li>
            <li><button className='btn btn-light w-100' onClick={usct}>USCT</button></li>
            <li><button className='btn btn-light w-100' onClick={usbt}>USBT</button></li>
            <li><button className='btn btn-light w-100' onClick={usbas}>USBAS</button></li>
            <li><button className='btn btn-light w-100' onClick={uslls}>USLLS</button></li>
            <li><button className='btn btn-light w-100' onClick={usap}>USAP</button></li>
            {/* <li><button onClick={usmphs}>USMPHS</button></li> */}
            <li><button className='btn btn-light w-100' onClick={usmc}>USMC</button></li>
          </ul>
        </div>
      </nav>

      <div className="container py-4">

        {tittle.length === 0 ? <h4 className='fw-semibold mb-1 theme'>Please select USS from above dropdown</h4> : <h3 className='fw-semibold mb-1 theme'>{tittle}</h3>}


        <div className="items_d border rounded">
          {allNoticesUSS.links.length === 0 ? <Spinner /> : <div className="list-group">

            {allNoticesUSS.text.map((item) => {
              iu++;
              return (
                <>
                  <a href={`http://ipu.ac.in${allNoticesUSS.links[iu]}`} target="_blank" rel='noopener noreferrer' className="list-group-item list-group-item-action">{item}</a>
                </>)
            })}

          </div>
          }
        </div>

        <h3 className='fw-semibold mt-4 mb-1 theme'>University Notices</h3>

        <div className="items_d border rounded">

          {allNotices.links.length === 0 ? <Spinner /> : <div class="list-group">
            {allNotices.text.map((item) => {
              i++;
              return (
                <>
                  <a href={`http://ipu.ac.in${allNotices.links[i]}`} target="_blank" rel='noopener noreferrer' className="list-group-item list-group-item-action">{item}</a>
                </>)
            })}

            {monthlyNotices.text.map((item) => {
              j++;
              return (
                <>
                  <a href={`http://ipu.ac.in${monthlyNotices.links[j]}`} target="_blank" rel='noopener noreferrer' className="list-group-item list-group-item-action">{item}</a>
                </>)
            })}

          </div>}
        </div>

        <form className="user" onSubmit={handleSubmit}>

          <div className="mb-3"><input className="form-control form-control-user w-25" placeholder='Email Address' name='email' required minLength={8} value={email} onChange={onChange} type="email" id="exampleInputEmail" aria-describedby="emailHelp" /></div>

          <button disabled={email.length < 8} className="btn btn-primary d-block btn-user" type="submit">Subscribe</button>

        </form>

      </div>
    </div>
  )
}

export default App
