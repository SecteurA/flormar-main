<?php

/*
Plugin Name:  Refetch Plugin
*/
add_action('admin_footer', 'show_admin_popup');

function show_admin_popup() {
    // Add the popup HTML and JavaScript to the admin dashboard
    ?>

<div id="refetch">
        <style>
            #refetch .popup {
                position: fixed;
                right: 20px;
                bottom: 20px;
                height: 40px;
                width: 40px;
                /* transform: rotate(45deg); */
                background: linear-gradient(45deg, #006BD6, #0ECAD4);
                padding: 2px;
                border-radius: 50%;
                cursor: url("/cursor-active.png");
                z-index: 9999;
            }

            #refetch .popup:active {
                opacity: 0.8;
            }

            #refetch .popup.err {
                background: red;
            }

            #refetch .popup.success {
                background: #0F0;
            }

            #refetch .popup.active svg {
                animation: rot 0.4s infinite linear;
            }

            @keyframes rot {
                0% {
                    transform: rotate(0deg);
                }

                100% {
                    transform: rotate(360deg);
                }
            }
        </style>
        <div class="popup" onclick="clearFrontCashe()">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1"
                viewBox="0 0 32 32" xml:space="preserve" style="fill: white;">
                <g>
                    <g id="spin">
                        <g>
                            <path
                                d="M25.883,6.086l-2.82,2.832C24.953,10.809,26,13.324,26,16c0,5.516-4.484,10-10,10v-2l-4,4l4,4v-2     c7.719,0,14-6.281,14-14C30,12.254,28.539,8.734,25.883,6.086z">
                            </path>
                            <path
                                d="M20,4l-4-4v2C8.281,2,2,8.281,2,16c0,3.746,1.461,7.266,4.117,9.914l2.82-2.832     C7.047,21.191,6,18.676,6,16c0-5.516,4.484-10,10-10v2L20,4z">
                            </path>
                        </g>
                    </g>
                </g>
            </svg>



        </div>

        <script>
            const clearFrontCashe = () => {
                const popup_classes = document.querySelector('#refetch	.popup').classList
                popup_classes.add('active');
                fetch('https://v2.flormar.ma/api/revalidate').then(res => res.json()).then(d => {
                    popup_classes.remove('active');
                    popup_classes.add('success');
                }).catch(err => {
                    popup_classes.remove('active');
                    popup_classes.add('err');
                }).finally(d => {
                    setTimeout(() => {
                        try {
                            popup_classes.remove('success');
                            popup_classes.remove('err');
                        } catch (error) {

                        }
                    }, 1000);
                })
            }
        </script>
    </div>

    <?php
}

