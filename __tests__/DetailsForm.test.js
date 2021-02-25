import React from 'react';
import DetailsForm from '../components/DetailsForm';
import { render, fireEvent, act } from '@testing-library/react-native'


describe("Test for testing create cv form", () => {

   const expectedResponse = {
        
                _id: "6037453fd79813394c669144",
                title: 'Google',
                name: 'Talha',
                email: 'Talha@gmail.com',
                phone: '03456918578',
                info: 'Good at teamwork',
                education: 'Graduated',
                experience: 'Angular, css, JavaScript',
                projects: 'Chat app\nE-commerce \nMusic identifier\nBitcoin Miner\nSocket programming',
                __v: 0
              
   }

    it("testaction", async () => {
        act( async () => {
                
        const { getByTestId } = await render(<DetailsForm />)

        //Here Id's are set to call respective textInput
        const projects = getByTestId("projectsId")
        const experience = getByTestId("experienceId")
        const educationWork = getByTestId("educationId")
        const personalInfo = getByTestId("infoId")
        const phone = getByTestId("phoneId")
        const email = getByTestId("emailId")
        const name = getByTestId("nameId")
        const title = getByTestId("titleId")
        const createCvButton = getByTestId("buttonId");
        
        //Here values set in each textInput
        fireEvent.changeText(title, 'Google');
        fireEvent.changeText(name, 'Talha');
        fireEvent.changeText(email, 'Talha@gmail.com');
        fireEvent.changeText(phone, '03456918578');
        fireEvent.changeText(personalInfo, 'Good at teamwork');
        fireEvent.changeText(educationWork, 'Graduated');
        fireEvent.changeText(experience, 'Angular, css, JavaScript');
        fireEvent.changeText(projects, 'Chat app\nE-commerce \nMusic identifier\nBitcoin Miner\nSocket programming');

        //Here button createCv is fired and response taken in const
        const response = fireEvent.press(createCvButton);
 
        //Here response is matched with real response
        expect(response).toEqual(expectedResponse);
              });
        
    });

})