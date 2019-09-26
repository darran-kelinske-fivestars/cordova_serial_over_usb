/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        var potText = document.getElementById('pot');
        var delta = document.getElementById('delta');
        var on = document.getElementById('on');
        var off = document.getElementById('off');
        var open = false;
        var str = '';
        var lastRead = new Date();

        var errorCallback = function(message) {
            alert('Error: ' + message);
        };
        // request permission first
        serial.requestPermission(
            // if user grants permission
            function(successMessage) {
                // open serial port
                serial.open(
                    {baudRate: 9600, dtr: true, rts: true},
                    // if port is successfully opened
                    function(successMessage) {
                        open = true;
                        // register the read callback
                        serial.registerReadCallback(
                            function success(data){
                            var receivedMessage = "";
                                // decode the received message
                                var view = new Uint8Array(data);

                                 if (view.length >= 1) {

                                	                                for (var j = 0; j < view.length; j++) {

                                	                                    var temp_str2 = String.fromCharCode(view[j]);
                                	                                    var str_esc2 = escape(temp_str2);

                                	                                    receivedMessage += str_esc2;

                                	                                }

                                	                            }
                                	                            console.log(receivedMessage);

                            },
                            // error attaching the callback
                            errorCallback
                        );
                    },
                    // error opening the port
                    errorCallback
                );
            },
            // user does not grant permission
            errorCallback
        );

        on.onclick = function() {
            console.log('click');
            if (open) serial.write('1');
        };
        off.onclick = function() {
            if (open) serial.write('0');
        }
    }
};

app.initialize()