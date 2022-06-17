import { useEffect, useState } from "react";

import { Grid } from '@mui/material';
import { DashboardLayout } from 'components/dashboard/DashboardLayout';
import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { useUserActions } from "actions";
import { ErrSuccess } from "./ErrSuccess";
import { NotiPerSite } from "./NotiPerSite";
import { SamplesPerSite } from "./SamplesPerSite";
import { UsersNum } from "./UsersNum";


export { Analytics };

function Analytics(props) {
  const colors = ['rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)']
  const [piedata, setpiedata] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [errSuccess, setErrSuccess] = useState({
    labels: ['Notifications type'],
    datasets: [
      {
        label: 'Success',
        data: [0],
        backgroundColor: 'rgba(0, 128, 0, 0.5)',
      },
      {
        label: 'Error',
        data: [0],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  })
  const [notiPerSite, setNotiPerSite] = useState({   
      labels: ['Sites'],               
      datasets: [
          {
              label: '',
              data: [],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
              label: '',
              data: [],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
          {
              label: '',
              data: [],
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
          },
          {
              label: '',
              data: [],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }
      ],
  })
  const [usersNum, setUserNum] = useState()
  const [err,setErr]=useState(null);

  const userActions = useUserActions();
  useEffect(() => {
    userActions.analytics()
      .then(res => {
        /*
        //for mock data:
        res.errSuccess.data = {success: 657, error: 221}
        res.notiPerSite.data = {Alice: 28, Eventim: 13, Gulliver: 2, Airbnb: 43}
        res.samplesPerSite.data = {Alice: 78, Eventim: 32, Gulliver: 12, Airbnb: 53}
        res.usersNum.data = {usersNum: 673}
        */
        setpiedata({
          ...piedata,
          labels: Object.keys(res.samplesPerSite.data),
          datasets: [
            {
              label: '# of Votes',
              data: Object.values(res.samplesPerSite.data),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1,
            },
          ],
        })
        setErrSuccess({
          ...errSuccess,
          datasets: [
            {
              label: 'Success',
              data: [res.errSuccess.data.success],
              backgroundColor: 'rgba(0, 128, 0, 0.5)',
            },
            {
              label: 'Error',
              data: [res.errSuccess.data.error],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ]
        })
        let temp = res.notiPerSite.data;
        let datasets = Object.keys(res.notiPerSite.data).map((key,i) => {
          return {
            label: key,
            data: [temp[key]],
            backgroundColor: colors[i],
          }
        })
        setNotiPerSite({
          ...notiPerSite,
          datasets 
          });
        setUserNum(res.usersNum.data.usersNum)
        }).catch(err=>{
          setErr(err);
        })
      
  }, [])
  if(err!=null){
    return(
      <DashboardLayout>
        <h2>{err}</h2>
      </DashboardLayout>
    )
  }
  else{
    return (
  
      <DashboardLayout>
        <form>
          <Card>
            <CardHeader
              title="Manager Analytics"
              subheader="Data is money. What is going on in LetMeKnow?"
            />
            <Divider />
            <CardContent>
  
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <NotiPerSite data={notiPerSite}/>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <ErrSuccess data={errSuccess}/>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <SamplesPerSite data={piedata} />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <UsersNum data={usersNum} />
                </Grid>
              </Grid>
            </CardContent>
  
          </Card>
  
        </form>
      </DashboardLayout>
    );
  }
}

