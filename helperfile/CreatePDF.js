const htmlContent = `
   <!DOCTYPE html>
   <html lang="en">
       <head>
           <meta charset="UTF-8">
           <style>
               .table{
                   width: 100%;
                   height: 100%;
                   margin-left:auto; 
                   margin-right:auto;
                   background-color: #34495E;
               }
   
               .table2{
                   margin-left:auto; 
                   margin-right:auto;
                   width: 800px;
                   height: 900px;
               }
   
               .name{
                   text-align: center;
               }
   
               .profilepic{
                   border-radius: 50%;
                   width: 150px;
                   height: 150px;
                   margin-left:auto; 
                   margin-right:auto;
                   display: block;
               }
   
               .td1{
                   width: 200px;
                   height: 1000px;
                   padding-left: 10px;
                   background-color: #FDFEFE;
                   
               }
   
               .td2{
                   width: 450px;
                   height: 1000px;
                   padding-left: 10px;
                   background-color: #FDFEFE;
               }
   
           </style>
           <title>CV</title> 
       </head>
       <body>
           <table class="table"  >
               <tr>
                   <td>
                       <table class="table2">
                           <tr>
                               <td class="td1">
                                   
                                   <section itemscope itemtype="http://schema.org/Person">
                                   <h1 class="name" itemprop="name">${name.toUpperCase().split(" ")[0]}<br> ${name.toUpperCase().split(" ")[1]}</h1>
                                   <img src="images/me.jpg" alt="" class="profilepic" itemprop="image">
                                   <h3>Contact</h3>
                                   <hr>
                                   <h4>Address:</h4>
                                   <section itemprop="location" itemscope itemtype="http://schema.org/Place"><p itemprop="address">43,Gulistan-e-Johar,Karachi</p></section>
                               
                                       <h5 itemprop="email">Email:</h5><p>${email}</p>
                                       <h5 itemprop="telephone">Phone:</h5><p>${phone}</p>
                               </section>

                               </td>
                               <td class="td2">
                                   <h1>Personal Information</h1>
                                   <hr>
                                   <p><span itemscope itemtype="http://schema.org/Person">
                                   ${info} 
                                   </p>
                                   <h3>Experience</h3>
                                   <hr>
                                   <h5><span itemscope itemtype="http://schema.org/Person">${experience}</h5>
                                   <h3>Projects</h3>
                                   <hr>
                                   <ul>
                                       <li>Footslog an android native mobile app that guides tourists and hikers while logging their journey experience</li>
                                       <li>Warped City a Unity engine based Mobile game, a 2D platformer with physics and sensor controls </li>
                                       <li>A library Management system based on PHP and MYSQL for librarians and borrowers</li>
                                       <li>A website for a car garage business "CarbonHood" developed in ASP.NET utilizing Restful APIs</li>
                                       <li>A cross platform mobile Grocery Application where vendors and sellers form a marketplace</li>
                                   </ul>
                                   <h3>Education</h3>
                                   <hr>
                                   <section itemscope itemtype="http://schema.org/EducationalOrganization"><h5>${education}</h5></section>
                               </td>
                           </tr>
                       </table>
                   </td>
               </tr>
           </table>        
       </body>
   </html>
`;
const createAndSavePDF = async (values, html) => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  export default createAndSavePDF(values);