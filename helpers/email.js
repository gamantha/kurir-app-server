export const advTemplate = (buttonText, headerMsg, bodyMsg, link, imgLink) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <title>Kurir.id | A Responsive Email Template</title>
    <!--
    SALTED | A RESPONSIVE EMAIL TEMPLATE
    =====================================

    Based on code used and tested by Litmus (@litmusapp)
    Originally developed by Kevin Mandeville (@KEVINgotbounce)
    Cleaned up by Jason Rodriguez (@rodriguezcommaj)
    Presented by A List Apart (@alistapart)

    Email is surprisingly hard. While this has been thoroughly tested, your mileage may vary.
    It's highly recommended that you test using a service like Litmus and your own devices.

    Enjoy!
    -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <style type="text/css">
      /* CLIENT-SPECIFIC STYLES */
      #outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
      .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */
      body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
      table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
      img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */
  
      /* RESET STYLES */
      body{margin:0; padding:0;}
      img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
      table{border-collapse:collapse !important;}
      body{height:100% !important; margin:0; padding:0; width:100% !important;}
  
      /* iOS BLUE LINKS */
      .appleBody a {color:#68440a; text-decoration: none;}
      .appleFooter a {color:#999999; text-decoration: none;}
  
      /* MOBILE STYLES */
      @media screen and (max-width: 525px) {
  
          /* ALLOWS FOR FLUID TABLES */
          table[class="wrapper"]{
            width:100% !important;
          }
  
          /* ADJUSTS LAYOUT OF LOGO IMAGE */
          td[class="logo"]{
            text-align: left;
            padding: 20px 0 20px 0 !important;
          }
  
          td[class="logo"] img{
            margin:0 auto!important;
          }
  
          /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
          td[class="mobile-hide"]{
            display:none;}
  
          img[class="mobile-hide"]{
            display: none !important;
          }
  
          img[class="img-max"]{
            max-width: 100% !important;
            height:auto !important;
          }
  
          /* FULL-WIDTH TABLES */
          table[class="responsive-table"]{
            width:100%!important;
          }
  
          /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
          td[class="padding"]{
            padding: 10px 5% 15px 5% !important;
          }
  
          td[class="padding-copy"]{
            padding: 10px 5% 10px 5% !important;
            text-align: center;
          }
  
          td[class="padding-meta"]{
            padding: 30px 5% 0px 5% !important;
            text-align: center;
          }
  
          td[class="no-pad"]{
            padding: 0 0 20px 0 !important;
          }
  
          td[class="no-padding"]{
            padding: 0 !important;
          }
  
          td[class="section-padding"]{
            padding: 50px 15px 50px 15px !important;
          }
  
          td[class="section-padding-bottom-image"]{
            padding: 50px 15px 0 15px !important;
          }
  
          /* ADJUST BUTTONS ON MOBILE */
          td[class="mobile-wrapper"]{
              padding: 10px 5% 15px 5% !important;
          }
  
          table[class="mobile-button-container"]{
              margin:0 auto;
              width:100% !important;
          }
  
          a[class="mobile-button"]{
              width:80% !important;
              padding: 15px !important;
              border: 0 !important;
              font-size: 16px !important;
          }
  
      }
  </style>
  </head>
  <body style="margin: 0; padding: 0;">
  
  <!-- HEADER -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td bgcolor="#ffffff">
              <div align="center" style="padding: 0px 15px 0px 15px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="500" class="wrapper">
                      <!-- LOGO/PREHEADER TEXT -->
                      <tr>
                          <td style="padding: 20px 0px 30px 0px;" class="logo">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                      <td bgcolor="#ffffff" width="100" align="left">
                                      <a href="https://kurirbackend-dev.herokuapp.com" target="_blank">
                                        <img alt="Logo" src="https://s3-ap-southeast-1.amazonaws.com/kurir-assets/kurir-logo.png" width="52" height="78" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 16px;" border="0">
                                      </a>
                                      </td>
                                      <td bgcolor="#ffffff" width="400" align="right" class="mobile-hide">
                                          <table border="0" cellpadding="0" cellspacing="0">
                                              <tr>
                                                  <td align="right" style="padding: 0 0 5px 0; font-size: 14px; font-family: Arial, sans-serif; color: #666666; text-decoration: none;"><span style="color: #666666; text-decoration: none;">
                                                  Kurir.id - your package & courier partner<br>Made in Indonesia, seriously</span>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </div>
          </td>
      </tr>
  </table>
  
  <!-- ONE COLUMN SECTION -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td bgcolor="#ffffff" align="center" style="padding: 70px 15px 70px 15px;" class="section-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table">
                  <tr>
                      <td>
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                  <td>
                                      <!-- HERO IMAGE -->
                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tbody>
                                               <tr>
                                                    <td class="padding-copy">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td>
                                                                    <a href="https://kurirbackend-dev.herokuapp.com" target="_blank">
                                                                      <img src=${imgLink} width="500" height="200" border="0" alt="welcome" style="display: block; padding: 0; color: #666666; text-decoration: none; font-family: Helvetica, arial, sans-serif; font-size: 16px; width: 500px; height: 200px;" class="img-max">
                                                                    </a>
                                                                </td>
                                                              </tr>
                                                          </table>
                                                    </td>
                                                </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <!-- COPY -->
                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                              <td align="center" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">
                                              ${headerMsg}
                                              </td>
                                          </tr>
                                          <tr>
                                              <td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">
                                              ${bodyMsg}
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <!-- BULLETPROOF BUTTON -->
                                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-button-container">
                                          <tr>
                                              <td align="center" style="padding: 25px 0 0 0;" class="padding-copy">
                                                  <table border="0" cellspacing="0" cellpadding="0" class="responsive-table">
                                                      <tr>
                                                          <td align="center">
                                                          <a href="${link}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; background-color: #d8283b; border-top: 15px solid #d8283b; border-bottom: 15px solid #d8283b; border-left: 25px solid #d8283b; border-right: 25px solid #d8283b; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; display: inline-block;" class="mobile-button">
                                                          ${buttonText} &rarr;</a>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
  
  <!-- FOOTER -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td bgcolor="#ffffff" align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                      <td style="padding: 20px 0px 20px 0px;">
                          <!-- UNSUBSCRIBE COPY -->
                          <table width="500" border="0" cellspacing="0" cellpadding="0" align="center" class="responsive-table">
                              <tr>
                                  <td align="center" valign="middle" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;">
                                      <span class="appleFooter" style="color:#666666;">
                                      Jalan Sukahaji No.126, Kota Bandung, Jawa Barat
                                      </span><br><a class="original-only" style="color: #666666; text-decoration: none;">Unsubscribe</a><span class="original-only" style="font-family: Arial, sans-serif; font-size: 12px; color: #444444;">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span><a style="color: #666666; text-decoration: none;">
                                      View this email in your browser
                                      </a>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
  
  </body>
  </html>`;
};

export const simpleTemplate = (headerMsg, bodyMsg) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <title>Kurir.id | A Responsive Email Template</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <style type="text/css">
            /* CLIENT-SPECIFIC STYLES */
            #outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
            .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
            .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */
            body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
            table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
            img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */
    
            /* RESET STYLES */
            body{margin:0; padding:0;}
            img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
            table{border-collapse:collapse !important;}
            body{height:100% !important; margin:0; padding:0; width:100% !important;}
    
            /* iOS BLUE LINKS */
            .appleBody a {color:#68440a; text-decoration: none;}
            .appleFooter a {color:#999999; text-decoration: none;}
    
            /* MOBILE STYLES */
            @media screen and (max-width: 525px) {
    
                    /* ALLOWS FOR FLUID TABLES */
                    table[class="wrapper"]{
                        width:100% !important;
                    }
    
                    /* ADJUSTS LAYOUT OF LOGO IMAGE */
                    td[class="logo"]{
                        text-align: left;
                        padding: 20px 0 20px 0 !important;
                    }
    
                    td[class="logo"] img{
                        margin:0 auto!important;
                    }
    
                    /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
                    td[class="mobile-hide"]{
                        display:none;}
    
                    img[class="mobile-hide"]{
                        display: none !important;
                    }
    
                    img[class="img-max"]{
                        max-width: 100% !important;
                        height:auto !important;
                    }
    
                    /* FULL-WIDTH TABLES */
                    table[class="responsive-table"]{
                        width:100%!important;
                    }
    
                    /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
                    td[class="padding"]{
                        padding: 10px 5% 15px 5% !important;
                    }
    
                    td[class="padding-copy"]{
                        padding: 10px 5% 10px 5% !important;
                        text-align: center;
                    }
    
                    td[class="padding-meta"]{
                        padding: 30px 5% 0px 5% !important;
                        text-align: center;
                    }
    
                    td[class="no-pad"]{
                        padding: 0 0 20px 0 !important;
                    }
    
                    td[class="no-padding"]{
                        padding: 0 !important;
                    }
    
                    td[class="section-padding"]{
                        padding: 50px 15px 50px 15px !important;
                    }
    
                    td[class="section-padding-bottom-image"]{
                        padding: 50px 15px 0 15px !important;
                    }
    
                    /* ADJUST BUTTONS ON MOBILE */
                    td[class="mobile-wrapper"]{
                            padding: 10px 5% 15px 5% !important;
                    }
    
                    table[class="mobile-button-container"]{
                            margin:0 auto;
                            width:100% !important;
                    }
    
                    a[class="mobile-button"]{
                            width:80% !important;
                            padding: 15px !important;
                            border: 0 !important;
                            font-size: 16px !important;
                    }
    
            }
    </style>
    </head>
    <body style="margin: 0; padding: 0;">
    
    <!-- HEADER -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                    <td bgcolor="#ffffff">
                            <div align="center" style="padding: 0px 15px 0px 15px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="500" class="wrapper">
                                            <!-- LOGO/PREHEADER TEXT -->
                                            <tr>
                                                    <td style="padding: 20px 0px 30px 0px;" class="logo">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                    <tr>
                                                                            <td bgcolor="#ffffff" width="100" align="left">
                                                                                <a href="http://alistapart.com/article/can-email-be-responsive/" target="_blank">
                                                                                    <img alt="Logo" src="https://s3-ap-southeast-1.amazonaws.com/kurir-assets/kurir-logo.png" width="52" height="78" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 16px;" border="0">
                                                                                </a>
                                                                            </td>
                                                                            <td bgcolor="#ffffff" width="400" align="right" class="mobile-hide">
                                                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                                                            <tr>
                                                                                                <td align="right" style="padding: 0 0 5px 0; font-size: 14px; font-family: Arial, sans-serif; color: #666666; text-decoration: none;"><span style="color: #666666; text-decoration: none;">
                                                                                                Kurir.id - your package & courier partner<br>Made in Indonesia, seriously</span>
                                                                                                </td>
                                                                                            </tr>
                                                                                    </table>
                                                                            </td>
                                                                    </tr>
                                                            </table>
                                                    </td>
                                            </tr>
                                    </table>
                            </div>
                    </td>
            </tr>
    </table>
    
    <!-- ONE COLUMN SECTION -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                    <td bgcolor="#ffffff" align="center" style="padding: 70px 15px 70px 15px;" class="section-padding">
                            <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table">
                                    <tr>
                                            <td>
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                            </tr>
                                                            <tr>
                                                                    <td>
                                                                            <!-- COPY -->
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                    <tr>
																																												<td align="center" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">
																																												${headerMsg}
																																												</td>
                                                                                    </tr>
                                                                                    <tr>
																																											<td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">
																																											${bodyMsg}
																																											</td>
                                                                                    </tr>
                                                                            </table>
                                                                    </td>
                                                            </tr>
                                                    </table>
                                            </td>
                                    </tr>
                            </table>
                    </td>
            </tr>
    </table>
    
    <!-- FOOTER -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                    <td bgcolor="#ffffff" align="center">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                                    <tr>
                                            <td style="padding: 20px 0px 20px 0px;">
                                                    <!-- UNSUBSCRIBE COPY -->
                                                    <table width="500" border="0" cellspacing="0" cellpadding="0" align="center" class="responsive-table">
                                                            <tr>
                                                                    <td align="center" valign="middle" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;">
                                                                        <span class="appleFooter" style="color:#666666;">
                                                                        Jalan Sukahaji No.126, Kota Bandung, Jawa Barat
                                                                        </span><br><a class="original-only" style="color: #666666; text-decoration: none;">Unsubscribe</a><span class="original-only" style="font-family: Arial, sans-serif; font-size: 12px; color: #444444;">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span><a style="color: #666666; text-decoration: none;">
                                                                        View this email in your browser
                                                                        </a>
                                                                    </td>
                                                            </tr>
                                                    </table>
                                            </td>
                                    </tr>
                            </table>
                    </td>
            </tr>
    </table>
    
    </body>
    </html>`;
};
