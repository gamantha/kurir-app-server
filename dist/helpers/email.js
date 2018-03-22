"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var template = function template(buttonText, HeaderMsg, bodyMsg, link) {
    return "<!DOCTYPE html>\n  <html lang=\"en\">\n  <head>\n  <title>Salted | A Responsive Email Template</title>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <style type=\"text/css\">\n      /* CLIENT-SPECIFIC STYLES */\n      #outlook a{padding:0;} /* Force Outlook to provide a \"view in browser\" message */\n      .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */\n      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */\n      body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */\n      table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */\n      img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */\n  \n      /* RESET STYLES */\n      body{margin:0; padding:0;}\n      img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}\n      table{border-collapse:collapse !important;}\n      body{height:100% !important; margin:0; padding:0; width:100% !important;}\n  \n      /* iOS BLUE LINKS */\n      .appleBody a {color:#68440a; text-decoration: none;}\n      .appleFooter a {color:#999999; text-decoration: none;}\n  \n      /* MOBILE STYLES */\n      @media screen and (max-width: 525px) {\n  \n          /* ALLOWS FOR FLUID TABLES */\n          table[class=\"wrapper\"]{\n            width:100% !important;\n          }\n  \n          /* ADJUSTS LAYOUT OF LOGO IMAGE */\n          td[class=\"logo\"]{\n            text-align: left;\n            padding: 20px 0 20px 0 !important;\n          }\n  \n          td[class=\"logo\"] img{\n            margin:0 auto!important;\n          }\n  \n          /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */\n          td[class=\"mobile-hide\"]{\n            display:none;}\n  \n          img[class=\"mobile-hide\"]{\n            display: none !important;\n          }\n  \n          img[class=\"img-max\"]{\n            max-width: 100% !important;\n            height:auto !important;\n          }\n  \n          /* FULL-WIDTH TABLES */\n          table[class=\"responsive-table\"]{\n            width:100%!important;\n          }\n  \n          /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */\n          td[class=\"padding\"]{\n            padding: 10px 5% 15px 5% !important;\n          }\n  \n          td[class=\"padding-copy\"]{\n            padding: 10px 5% 10px 5% !important;\n            text-align: center;\n          }\n  \n          td[class=\"padding-meta\"]{\n            padding: 30px 5% 0px 5% !important;\n            text-align: center;\n          }\n  \n          td[class=\"no-pad\"]{\n            padding: 0 0 20px 0 !important;\n          }\n  \n          td[class=\"no-padding\"]{\n            padding: 0 !important;\n          }\n  \n          td[class=\"section-padding\"]{\n            padding: 50px 15px 50px 15px !important;\n          }\n  \n          td[class=\"section-padding-bottom-image\"]{\n            padding: 50px 15px 0 15px !important;\n          }\n  \n          /* ADJUST BUTTONS ON MOBILE */\n          td[class=\"mobile-wrapper\"]{\n              padding: 10px 5% 15px 5% !important;\n          }\n  \n          table[class=\"mobile-button-container\"]{\n              margin:0 auto;\n              width:100% !important;\n          }\n  \n          a[class=\"mobile-button\"]{\n              width:80% !important;\n              padding: 15px !important;\n              border: 0 !important;\n              font-size: 16px !important;\n          }\n  \n      }\n  </style>\n  </head>\n  <body style=\"margin: 0; padding: 0;\">\n  \n  <!-- HEADER -->\n  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n      <tr>\n          <td bgcolor=\"#ffffff\">\n              <div align=\"center\" style=\"padding: 0px 15px 0px 15px;\">\n                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"500\" class=\"wrapper\">\n                      <!-- LOGO/PREHEADER TEXT -->\n                      <tr>\n                          <td style=\"padding: 20px 0px 30px 0px;\" class=\"logo\">\n                              <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                  <tr>\n                                      <td bgcolor=\"#ffffff\" width=\"100\" align=\"left\">\n                                      <a href=\"https://kurirbackend-dev.herokuapp.com\" target=\"_blank\">\n                                        <img alt=\"Logo\" src=\"https://s3-ap-southeast-1.amazonaws.com/kurir-assets/kurir-logo.png\" width=\"52\" height=\"78\" style=\"display: block; font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 16px;\" border=\"0\">\n                                      </a>\n                                      </td>\n                                      <td bgcolor=\"#ffffff\" width=\"400\" align=\"right\" class=\"mobile-hide\">\n                                          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n                                              <tr>\n                                                  <td align=\"right\" style=\"padding: 0 0 5px 0; font-size: 14px; font-family: Arial, sans-serif; color: #666666; text-decoration: none;\"><span style=\"color: #666666; text-decoration: none;\">\n                                                  Kurir.id - your courier partner<br>Made in Indonesia, seriously.</span>\n                                                  </td>\n                                              </tr>\n                                          </table>\n                                      </td>\n                                  </tr>\n                              </table>\n                          </td>\n                      </tr>\n                  </table>\n              </div>\n          </td>\n      </tr>\n  </table>\n  \n  <!-- ONE COLUMN SECTION -->\n  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n      <tr>\n          <td bgcolor=\"#ffffff\" align=\"center\" style=\"padding: 70px 15px 70px 15px;\" class=\"section-padding\">\n              <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"500\" class=\"responsive-table\">\n                  <tr>\n                      <td>\n                          <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n                              <tr>\n                                  <td>\n                                      <!-- HERO IMAGE -->\n                                      <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n                                          <tbody>\n                                               <tr>\n                                                    <td class=\"padding-copy\">\n                                                        <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n                                                            <tr>\n                                                                <td>\n                                                                    <a href=\"https://kurirbackend-dev.herokuapp.com\" target=\"_blank\">\n                                                                      <img src=\"https://s3-ap-southeast-1.amazonaws.com/kurir-assets/welcome.gif\" width=\"500\" height=\"200\" border=\"0\" alt=\"welcome\" style=\"display: block; padding: 0; color: #666666; text-decoration: none; font-family: Helvetica, arial, sans-serif; font-size: 16px; width: 500px; height: 200px;\" class=\"img-max\">\n                                                                    </a>\n                                                                </td>\n                                                              </tr>\n                                                          </table>\n                                                    </td>\n                                                </tr>\n                                          </tbody>\n                                      </table>\n                                  </td>\n                              </tr>\n                              <tr>\n                                  <td>\n                                      <!-- COPY -->\n                                      <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n                                          <tr>\n                                              <td align=\"center\" style=\"font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;\" class=\"padding-copy\">\n                                              " + HeaderMsg + "\n                                              </td>\n                                          </tr>\n                                          <tr>\n                                              <td align=\"center\" style=\"padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;\" class=\"padding-copy\">\n                                              " + bodyMsg + "\n                                              </td>\n                                          </tr>\n                                      </table>\n                                  </td>\n                              </tr>\n                              <tr>\n                                  <td>\n                                      <!-- BULLETPROOF BUTTON -->\n                                      <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"mobile-button-container\">\n                                          <tr>\n                                              <td align=\"center\" style=\"padding: 25px 0 0 0;\" class=\"padding-copy\">\n                                                  <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"responsive-table\">\n                                                      <tr>\n                                                          <td align=\"center\">\n                                                          <a href=\"" + link + "\" target=\"_blank\" style=\"font-size: 16px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; background-color: #d8283b; border-top: 15px solid #d8283b; border-bottom: 15px solid #d8283b; border-left: 25px solid #d8283b; border-right: 25px solid #d8283b; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; display: inline-block;\" class=\"mobile-button\">\n                                                          " + buttonText + " &rarr;</a>\n                                                          </td>\n                                                      </tr>\n                                                  </table>\n                                              </td>\n                                          </tr>\n                                      </table>\n                                  </td>\n                              </tr>\n                          </table>\n                      </td>\n                  </tr>\n              </table>\n          </td>\n      </tr>\n  </table>\n  \n  <!-- FOOTER -->\n  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n      <tr>\n          <td bgcolor=\"#ffffff\" align=\"center\">\n              <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n                  <tr>\n                      <td style=\"padding: 20px 0px 20px 0px;\">\n                          <!-- UNSUBSCRIBE COPY -->\n                          <table width=\"500\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" class=\"responsive-table\">\n                              <tr>\n                                  <td align=\"center\" valign=\"middle\" style=\"font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;\">\n                                      <span class=\"appleFooter\" style=\"color:#666666;\">\n                                      Jalan Sukahaji No.126, Kota Bandung, Jawa Barat\n                                      </span><br><a class=\"original-only\" style=\"color: #666666; text-decoration: none;\">Unsubscribe</a><span class=\"original-only\" style=\"font-family: Arial, sans-serif; font-size: 12px; color: #444444;\">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span><a style=\"color: #666666; text-decoration: none;\">\n                                      View this email in your browser\n                                      </a>\n                                  </td>\n                              </tr>\n                          </table>\n                      </td>\n                  </tr>\n              </table>\n          </td>\n      </tr>\n  </table>\n  \n  </body>\n  </html>";
};

exports.default = template;