import {Router, RouterConfiguration} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';

@inject(HttpClient)
export class App {
  toSend="";
  http;
  url;
  urlBase="https://requestb.in/13b6tv41";
  body = "";
  
  constructor(http){
    http.configure(config => {
      config 
        .withBaseUrl('https://requestb.in/')
        .withDefaults({
          mode: 'no-cors' ,
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch',
            'Content-Type': 'application/json'
          }
        })
        .withInterceptor ({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            if (response.status == 200) {
              console.log("Successful!");
            } else {
              console.log(`Error. Recieved a ${response.status} instead.`);
            }
            return response;
          }
        });
    });
    this.http = http;
  }

  resetVisualCadence(){
    this.url = this.urlBase + "?foo=" + this.toSend;
    
    this.http.fetch(this.url, {method: 'post', body: json(this.body)})
      .then(response => {
        //response.json(); //this throws an error because there's no JSON it returns
        console.log(response);
      });
  }
}
