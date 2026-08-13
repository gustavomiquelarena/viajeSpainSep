// Datos de hospedajes desde Hospedajes.xlsx (geocodificados)
const HOSPEDAJES = [
  {
    "opcion": "1A",
    "hospedaje": "MH Apartments Suites",
    "link": "https://www.hoteles.com/ho372951/?chkin=2026-09-17&chkout=2026-09-23&x_pwa=1&rfrr=HSR&pwa_ts=1781997728561&referrerUrl=aHR0cHM6Ly93d3cuaG90ZWxlcy5jb20vSG90ZWwtU2VhcmNo&useRewards=true&rm1=a2%3Ac14%3Ac11%3Ac8&regionId=6357275&destination=La+Dreta+de+l%27Eixample%2C+Barcelona%2C+Catalu%C3%B1a%2C+Espa%C3%B1a&destType=MARKET&neighborhoodId=6357275&latLong=41.393894%2C2.168229&nightly_price=-3%2C350&sort=RECOMMENDED&top_dp=1922&top_cur=USD&userIntent=&selectedRoomType=325072111&selectedRatePlan=396584337&expediaPropertyId=4253700&searchId=39e809a5-570b-4193-8ac0-b876d4af829f",
    "sitio": "Hoteles.com",
    "direccion": "Carrer De Girona 110, Barcelona, 08009",
    "dorm": "2",
    "banos": "1",
    "camas": "3 individuales + 1 sofá cama doble",
    "calificacion": "8,4/10",
    "importe": "USD 1.922",
    "cancelacion": "Sin cancelación",
    "lat": 41.398,
    "lng": 2.1691,
    "address_estimated": false
  },
  {
    "opcion": "1B",
    "hospedaje": "MH Apartments Suites",
    "link": "https://www.hoteles.com/ho372951/?chkin=2026-09-17&chkout=2026-09-23&x_pwa=1&rfrr=HSR&pwa_ts=1781997728561&referrerUrl=aHR0cHM6Ly93d3cuaG90ZWxlcy5jb20vSG90ZWwtU2VhcmNo&useRewards=true&rm1=a2%3Ac14%3Ac11%3Ac8&regionId=6357275&destination=La+Dreta+de+l%27Eixample%2C+Barcelona%2C+Catalu%C3%B1a%2C+Espa%C3%B1a&destType=MARKET&neighborhoodId=6357275&latLong=41.393894%2C2.168229&nightly_price=-3%2C350&sort=RECOMMENDED&top_dp=1922&top_cur=USD&userIntent=&selectedRoomType=325072111&selectedRatePlan=396584337&expediaPropertyId=4253700&searchId=39e809a5-570b-4193-8ac0-b876d4af829f",
    "sitio": "Hoteles.com",
    "direccion": "Carrer De Girona 110, Barcelona, 08009",
    "dorm": "2",
    "banos": "1",
    "camas": "3 individuales + 1 sofá cama doble",
    "calificacion": "8,4/10",
    "importe": "USD 2.104",
    "cancelacion": "Cancelable hasta 10/09/2026",
    "lat": 41.398,
    "lng": 2.1691,
    "address_estimated": false
  },
  {
    "opcion": "2",
    "hospedaje": "Residencia Valencia II",
    "link": "https://www.airbnb.com.ar/rooms/786115179525662575?adults=3&check_in=2026-09-17&check_out=2026-09-23&children=2&location=Eixample%2C%20Barcelona%2C%20Espa%C3%B1a&search_mode=regular_search&source_impression_id=p3_1781998323_P3aMPZVdHUXU3Duk&previous_page_section_name=1001&federated_search_id=72c32c8a-bc95-4271-92ed-2bc4a1af7301",
    "sitio": "Airbnb",
    "direccion": "Barcelona, Catalunya — dirección exacta no visible",
    "dorm": "3",
    "banos": "1.5",
    "camas": "2 queen + 1 individual",
    "calificacion": "4,64/5",
    "importe": "USD 2.198",
    "cancelacion": "Cancelable hasta 03/09/2026",
    "lat": 41.3965,
    "lng": 2.166,
    "address_estimated": true
  },
  {
    "opcion": "3",
    "hospedaje": "Amazing apartment WIFI in center",
    "link": "https://www.airbnb.com.ar/book/stays/2860194?numberOfAdults=3&checkin=2026-09-17&checkout=2026-09-23&numberOfChildren=2&guestCurrency=USD&productId=2860194&isWorkTrip=false&numberOfInfants=0&numberOfPets=0",
    "sitio": "Airbnb",
    "direccion": "Barcelona, zona Urquinaona / Plaza Catalunya",
    "dorm": "1",
    "banos": "1.5",
    "camas": "1 queen + 3 sofás cama",
    "calificacion": "4,65/5",
    "importe": "USD 2.222",
    "cancelacion": "Sin cancelación",
    "lat": 41.3891,
    "lng": 2.1724,
    "address_estimated": false
  },
  {
    "opcion": "4",
    "hospedaje": "Acogedor Apartmento en Casanova-Eixample",
    "link": "https://www.airbnb.com.ar/rooms/2725917?adults=3&check_in=2026-09-17&check_out=2026-09-23&children=2&location=Eixample%2C%20Barcelona%2C%20Espa%C3%B1a&search_mode=regular_search&source_impression_id=p3_1781998770_P3RIZi5AW-hBLc-x&previous_page_section_name=1001&federated_search_id=02b1b797-5912-4b07-afd3-6cfe92cc6771",
    "sitio": "Airbnb",
    "direccion": "Barcelona, zona Eixample / Casanova",
    "dorm": "3",
    "banos": "1",
    "camas": "3 queen",
    "calificacion": "4,6/5",
    "importe": "USD 1.962",
    "cancelacion": "Cancelable hasta 12/09/2026",
    "lat": 41.3898,
    "lng": 2.1538,
    "address_estimated": false
  },
  {
    "opcion": "5",
    "hospedaje": "Apartamento BBarcelona Urban 31",
    "link": "https://www.airbnb.com.ar/book/stays/1314309650430221260?numberOfAdults=3&checkin=2026-09-17&checkout=2026-09-23&numberOfChildren=2&guestCurrency=USD&productId=1314309650430221260&isWorkTrip=false&numberOfInfants=0&numberOfPets=0",
    "sitio": "Airbnb",
    "direccion": "Barcelona, zona Eixample Esquerra",
    "dorm": "2",
    "banos": "1",
    "camas": "2 dobles + 1 sofá cama",
    "calificacion": "4,41/5",
    "importe": "USD 1.874",
    "cancelacion": "Cancelable hasta 02/09/2026",
    "lat": 41.3818,
    "lng": 2.1485,
    "address_estimated": false
  },
  {
    "opcion": "6A",
    "hospedaje": "AinB Sagrada Familia Apartments",
    "link": "https://www.hoteles.com/ho423239/ainb-sagrada-familia-apartments-barcelona-espana/?chkin=2026-09-17&chkout=2026-09-23&x_pwa=1&rfrr=HSR&pwa_ts=1781997580919&referrerUrl=aHR0cHM6Ly93d3cuaG90ZWxlcy5jb20vSG90ZWwtU2VhcmNo&useRewards=true&rm1=a2%3Ac14%3Ac11%3Ac8&regionId=6357275&destination=La+Dreta+de+l%27Eixample%2C+Barcelona%2C+Catalu%C3%B1a%2C+Espa%C3%B1a&destType=MARKET&neighborhoodId=553248633935944648&latLong=41.393894%2C2.168229&sort=RECOMMENDED&top_dp=2180&top_cur=USD&userIntent=&selectedRoomType=200232956&selectedRatePlan=201374437&expediaPropertyId=5510232&searchId=eed71616-9aec-4f1b-b5f3-6f902c2a8002",
    "sitio": "Hoteles.com",
    "direccion": "Carrer Sicilia 109, Barcelona, 08013",
    "dorm": "2",
    "banos": "2",
    "camas": "1 doble + 2 individuales + 2 sofás cama individuales",
    "calificacion": "8,8/10",
    "importe": "USD 2.180",
    "cancelacion": "Sin cancelación",
    "lat": 41.4005,
    "lng": 2.181,
    "address_estimated": false
  },
  {
    "opcion": "6B",
    "hospedaje": "AinB Sagrada Familia Apartments",
    "link": "https://www.hoteles.com/ho423239/ainb-sagrada-familia-apartments-barcelona-espana/?chkin=2026-09-17&chkout=2026-09-23&x_pwa=1&rfrr=HSR&pwa_ts=1781997580919&referrerUrl=aHR0cHM6Ly93d3cuaG90ZWxlcy5jb20vSG90ZWwtU2VhcmNo&useRewards=true&rm1=a2%3Ac14%3Ac11%3Ac8&regionId=6357275&destination=La+Dreta+de+l%27Eixample%2C+Barcelona%2C+Catalu%C3%B1a%2C+Espa%C3%B1a&destType=MARKET&neighborhoodId=553248633935944648&latLong=41.393894%2C2.168229&sort=RECOMMENDED&top_dp=2180&top_cur=USD&userIntent=&selectedRoomType=200232956&selectedRatePlan=201374437&expediaPropertyId=5510232&searchId=eed71616-9aec-4f1b-b5f3-6f902c2a8002",
    "sitio": "Hoteles.com",
    "direccion": "Carrer Sicilia 109, Barcelona, 08013",
    "dorm": "2",
    "banos": "2",
    "camas": "1 doble + 2 individuales + 2 sofás cama individuales",
    "calificacion": "8,8/10",
    "importe": "USD 2.406",
    "cancelacion": "Cancelable hasta 15/09/2026",
    "lat": 41.4005,
    "lng": 2.181,
    "address_estimated": false
  },
  {
    "opcion": "7",
    "hospedaje": "Sweet BCN Sagrada Familia",
    "link": "https://www.booking.com/hotel/es/sweet-bcn-sagrada-familia.es.html?aid=964694&label=booking_confirmation-RR0VLY9%401779920205-M1q3ex%401780866997&sid=0c84e4a2cc470302e644366efe0bd805&age=11&age=14&age=8&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&dist=0&do_availability_check=1&group_adults=2&group_children=3&hp_avform=1&hp_group_set=0&no_rooms=1&origin=hp&sb_price_type=total&src=hotel&type=total&",
    "sitio": "Booking",
    "direccion": "Carrer de València 469, Barcelona, 08013",
    "dorm": "3",
    "banos": "2",
    "camas": "6 camas, sin desglose completo",
    "calificacion": "7,9/10",
    "importe": "USD 2.051",
    "cancelacion": "Cancelable hasta 10/09/2026",
    "lat": 41.4055,
    "lng": 2.1793,
    "address_estimated": false
  },
  {
    "opcion": "8.1A",
    "hospedaje": "AB Sagrada Familia Views – Planta baja",
    "link": "https://www.booking.com/hotel/es/4025-ab-monumental-5-2.es.html?label=booking_confirmation-RR0VLY9%401779920205-EqywUw%401780867106&aid=964694&ucfs=1&arphpl=1&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=3&req_children=3&age=11&req_age=11&age=8&req_age=8&age=14&req_age=14&hpos=1&hapos=1&sr_order=popularity&srpvid=f07e9a0ce9af023c&srepoch=1782078884&all_sr_blocks=792656125_339056735_5_0_0&highlighted_blocks=792656125_339056735_5_0_0&matching_block_id=792656125_339056735_5_0_0&sr_pri_blocks=792656125_339056735_5_0_0__129700&from=searchresults",
    "sitio": "Booking",
    "direccion": "Carrer Marina 212, Barcelona, 08013",
    "dorm": "3",
    "banos": "2",
    "camas": "2 + 2 + 1 individuales",
    "calificacion": "8,5/10",
    "importe": "USD 1.488",
    "cancelacion": "No reembolsable",
    "lat": 41.4026,
    "lng": 2.1802,
    "address_estimated": false
  },
  {
    "opcion": "8.1B",
    "hospedaje": "AB Sagrada Familia Views – Planta baja",
    "link": "https://www.booking.com/hotel/es/4025-ab-monumental-5-2.es.html?label=booking_confirmation-RR0VLY9%401779920205-EqywUw%401780867106&aid=964694&ucfs=1&arphpl=1&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=3&req_children=3&age=11&req_age=11&age=8&req_age=8&age=14&req_age=14&hpos=1&hapos=1&sr_order=popularity&srpvid=f07e9a0ce9af023c&srepoch=1782078884&all_sr_blocks=792656125_339056735_5_0_0&highlighted_blocks=792656125_339056735_5_0_0&matching_block_id=792656125_339056735_5_0_0&sr_pri_blocks=792656125_339056735_5_0_0__129700&from=searchresults",
    "sitio": "Booking",
    "direccion": "Carrer Marina 212, Barcelona, 08013",
    "dorm": "3",
    "banos": "2",
    "camas": "2 + 2 + 1 individuales",
    "calificacion": "8,5/10",
    "importe": "USD 1.741",
    "cancelacion": "Cancelable hasta 03/09/2026",
    "lat": 41.4026,
    "lng": 2.1802,
    "address_estimated": false
  },
  {
    "opcion": "8.2A",
    "hospedaje": "AB Sagrada Familia Views – 3 dormitorios",
    "link": "https://www.booking.com/hotel/es/4025-ab-monumental-5-2.es.html?label=booking_confirmation-RR0VLY9%401779920205-EqywUw%401780867106&aid=964694&ucfs=1&arphpl=1&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=3&req_children=3&age=11&req_age=11&age=8&req_age=8&age=14&req_age=14&hpos=1&hapos=1&sr_order=popularity&srpvid=f07e9a0ce9af023c&srepoch=17820788846&all_sr_blocks=792656125_339056735_5_0_0&highlighted_blocks=792656125_339056735_5_0_0&matching_block_id=792656125_339056735_5_0_0&sr_pri_blocks=792656125_339056735_5_0_0__129700&from=searchresults",
    "sitio": "Booking",
    "direccion": "Carrer Marina 212, Barcelona, 08013",
    "dorm": "3",
    "banos": "1*",
    "camas": "2 + 2 + 1 individuales",
    "calificacion": "8,5/10",
    "importe": "USD 1.595",
    "cancelacion": "No reembolsable",
    "lat": 41.4026,
    "lng": 2.1802,
    "address_estimated": false
  },
  {
    "opcion": "8.2B",
    "hospedaje": "AB Sagrada Familia Views – 3 dormitorios",
    "link": "https://www.booking.com/hotel/es/4025-ab-monumental-5-2.es.html?label=booking_confirmation-RR0VLY9%401779920205-EqywUw%401780867106&aid=964694&ucfs=1&arphpl=1&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=3&req_children=3&age=11&req_age=11&age=8&req_age=8&age=14&req_age=14&hpos=1&hapos=1&sr_order=popularity&srpvid=f07e9a0ce9af023c&srepoch=1782078884&all_sr_blocks=792656125_339056735_5_0_0&highlighted_blocks=792656125_339056735_5_0_0&matching_block_id=792656125_339056735_5_0_0&sr_pri_blocks=792656125_339056735_5_0_0__129700&from=searchresults",
    "sitio": "Booking",
    "direccion": "Carrer Marina 212, Barcelona, 08013",
    "dorm": "3",
    "banos": "1*",
    "camas": "2 + 2 + 1 individuales",
    "calificacion": "8,5/10",
    "importe": "USD 1.866",
    "cancelacion": "Cancelable hasta 03/09/2026",
    "lat": 41.4026,
    "lng": 2.1802,
    "address_estimated": false
  },
  {
    "opcion": "8.3A",
    "hospedaje": "AB Sagrada Familia Views – Superior 3 dormitorios",
    "link": "https://www.booking.com/hotel/es/4025-ab-monumental-5-2.es.html?label=booking_confirmation-RR0VLY9%401779920205-EqywUw%401780867106&aid=964694&ucfs=1&arphpl=1&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=3&req_children=3&age=11&req_age=11&age=8&req_age=8&age=14&req_age=14&hpos=1&hapos=1&sr_order=popularity&srpvid=f07e9a0ce9af023c&srepoch=1782078884&all_sr_blocks=792656125_339056735_5_0_0&highlighted_blocks=792656125_339056735_5_0_0&matching_block_id=792656125_339056735_5_0_0&sr_pri_blocks=792656125_339056735_5_0_0__129700&from=searchresults",
    "sitio": "Booking",
    "direccion": "Carrer Marina 212, Barcelona, 08013",
    "dorm": "3",
    "banos": "2",
    "camas": "2 + 2 + 1 individuales",
    "calificacion": "8,5/10",
    "importe": "USD 1.655",
    "cancelacion": "No reembolsable",
    "lat": 41.4026,
    "lng": 2.1802,
    "address_estimated": false
  },
  {
    "opcion": "8.3B",
    "hospedaje": "AB Sagrada Familia Views – Superior 3 dormitorios",
    "link": "https://www.booking.com/hotel/es/4025-ab-monumental-5-2.es.html?label=booking_confirmation-RR0VLY9%401779920205-EqywUw%401780867106&aid=964694&ucfs=1&arphpl=1&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=3&req_children=3&age=11&req_age=11&age=8&req_age=8&age=14&req_age=14&hpos=1&hapos=1&sr_order=popularity&srpvid=f07e9a0ce9af023c&srepoch=1782078884&all_sr_blocks=792656125_339056735_5_0_0&highlighted_blocks=792656125_339056735_5_0_0&matching_block_id=792656125_339056735_5_0_0&sr_pri_blocks=792656125_339056735_5_0_0__129700&from=searchresults",
    "sitio": "Booking",
    "direccion": "Carrer Marina 212, Barcelona, 08013",
    "dorm": "3",
    "banos": "2",
    "camas": "2 + 2 + 1 individuales",
    "calificacion": "8,5/10",
    "importe": "USD 1.936",
    "cancelacion": "Cancelable hasta 03/09/2026",
    "lat": 41.4026,
    "lng": 2.1802,
    "address_estimated": false
  },
  {
    "opcion": "8.4A",
    "hospedaje": "AB Sagrada Familia Views – Apartamento terraza",
    "link": "https://www.booking.com/hotel/es/4025-ab-monumental-5-2.es.html?label=booking_confirmation-RR0VLY9%401779920205-EqywUw%401780867106&aid=964694&ucfs=1&arphpl=1&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=3&req_children=3&age=11&req_age=11&age=8&req_age=8&age=14&req_age=14&hpos=1&hapos=1&sr_order=popularity&srpvid=f07e9a0ce9af023c&srepoch=1782078884&all_sr_blocks=792656125_339056735_5_0_0&highlighted_blocks=792656125_339056735_5_0_0&matching_block_id=792656125_339056735_5_0_0&sr_pri_blocks=792656125_339056735_5_0_0__129700&from=searchresults",
    "sitio": "Booking",
    "direccion": "Carrer Marina 212, Barcelona, 08013",
    "dorm": "3",
    "banos": "2",
    "camas": "2 + 2 + 2 individuales",
    "calificacion": "8,5/10",
    "importe": "USD 1.672",
    "cancelacion": "No reembolsable",
    "lat": 41.4026,
    "lng": 2.1802,
    "address_estimated": false
  },
  {
    "opcion": "8.4B",
    "hospedaje": "AB Sagrada Familia Views – Apartamento terraza",
    "link": "https://www.booking.com/hotel/es/4025-ab-monumental-5-2.es.html?label=booking_confirmation-RR0VLY9%401779920205-EqywUw%401780867106&aid=964694&ucfs=1&arphpl=1&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=3&req_children=3&age=11&req_age=11&age=8&req_age=8&age=14&req_age=14&hpos=1&hapos=1&sr_order=popularity&srpvid=f07e9a0ce9af023c&srepoch=1782078884&all_sr_blocks=792656125_339056735_5_0_0&highlighted_blocks=792656125_339056735_5_0_0&matching_block_id=792656125_339056735_5_0_0&sr_pri_blocks=792656125_339056735_5_0_0__129700&from=searchresults",
    "sitio": "Booking",
    "direccion": "Carrer Marina 212, Barcelona, 08013",
    "dorm": "3",
    "banos": "2",
    "camas": "2 + 2 + 2 individuales",
    "calificacion": "8,5/10",
    "importe": "USD 1.959",
    "cancelacion": "Cancelable hasta 03/09/2026",
    "lat": 41.4026,
    "lng": 2.1802,
    "address_estimated": false
  },
  {
    "opcion": "10",
    "hospedaje": "EasySleep Eixample – Apartamento 2 Hab Standard",
    "link": "https://www.booking.com/hotel/es/apartamentos-sicilia-159.es.html?label=booking_confirmation-RR0VLY9%401779920205-mTpXWu%401780868010&sid=0c84e4a2cc470302e644366efe0bd805&aid=964694&ucfs=1&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&group_adults=2&no_rooms=1&group_children=3&age=14&req_age=14&age=5&req_age=5&age=8&req_age=8&nflt=fc%3D2%3Bprice%3DUSD-min-340-1%3Boos%3D1&srpvid=f04a04775b9a0032&srepoch=1782347942&matching_block_id=27275402_432109159_5_0_0&atlas_src=sr_iw_title",
    "sitio": "Booking",
    "direccion": "Calle Sicilia 159, Barcelona",
    "dorm": "2",
    "banos": "2",
    "camas": "1 cama doble + 2 individuales + 1 sofá cama doble",
    "calificacion": "8,6/10",
    "importe": "USD 2.009",
    "cancelacion": "Cancelable hasta 10/09/2026",
    "lat": 41.3985,
    "lng": 2.1801,
    "address_estimated": false
  },
  {
    "opcion": "11",
    "hospedaje": "A charming place in the world",
    "link": "https://www.airbnb.com.ar/rooms/28688045?adults=3&check_in=2026-09-17&check_out=2026-09-23&children=2&guests=5&location=Eixample%2C%20Barcelona%2C%20Espa%C3%B1a&search_mode=regular_search&source_impression_id=p3_1782348294_P3tRYwp2Z5QFupZp&previous_page_section_name=1001&federated_search_id=f972dfa8-79ff-42ca-bf7f-fbe4ff9f89ab",
    "sitio": "Airbnb",
    "direccion": "Barcelona, Catalunya — Dreta de l’Eixample / cerca de Passeig de Gràcia; dirección exacta no visible",
    "dorm": "2",
    "banos": "1",
    "camas": "1 cama doble + 1 cucheta + 1 sofá",
    "calificacion": "4,78/5",
    "importe": "USD 2.264",
    "cancelacion": "Cancelable hasta 16/09/2026",
    "lat": 41.393,
    "lng": 2.165,
    "address_estimated": true
  },
  {
    "opcion": "12",
    "hospedaje": "EasySleep Gaudi Terrace",
    "link": "https://www.booking.com/hotel/es/apartamentos-valencia-347.es.html?label=booking_confirmation-RR0VLY9%401779920205-mTpXWu%401780868010&sid=6e2b9068bb46364071ab5cdf9de1afb3&aid=964694&ucfs=1&checkin=2026-09-17&checkout=2026-09-23&dest_id=-372490&dest_type=city&group_adults=2&no_rooms=1&group_children=3&age=14&req_age=14&age=5&req_age=5&age=8&req_age=8&nflt=fc%3D2%3Bprice%3DUSD-min-320-1&srpvid=213d99800e630c22&srepoch=1782683484&matching_block_id=27277504_432109171_5_0_0&atlas_src=sr_iw_title",
    "sitio": "Booking",
    "direccion": "Valencia 347, Eixample, 08009 Barcelona",
    "dorm": "TBD",
    "banos": "TBD",
    "camas": "TBD",
    "calificacion": "8,7/10",
    "importe": "USD 1.813",
    "cancelacion": "Con política de cancelación",
    "lat": 41.3980,
    "lng": 2.1706,
    "address_estimated": true
  }
];

const PUNTOS_TURISTICOS = [
  {
    "id": "t1",
    "dia": 1,
    "fecha": "18/9",
    "nombre": "Plaza Cataluña y Las Ramblas",
    "lat": 41.3870,
    "lng": 2.1700,
    "tiempo": "09:00 - 10:00",
    "descripcion": "Paseo peatonal inicial por el centro de la ciudad.",
    "imagen": "https://images.unsplash.com/photo-1587330933367-183cb53a5f54?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Placa+de+Catalunya+Barcelona",
    "viability": {
      "horario": "Libre 24 hs.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Plaza Cataluña funciona como el centro de unión de la ciudad histórica y el ensanche modernista. El mirador de la novena planta de El Corte Inglés es gratuito y abre de lunes a sábado de 09:00 a 21:00/21:30, ofreciendo una panorámica elevada de la plaza y la montaña de Montjuïc.\n\nLas Ramblas y el Mercado de la Boquería: El Mercado de la Boquería abre de lunes a sábado de 08:00 a 20:30. Acceso libre y gratuito. Cierre Dominical Crítico: El mercado permanece cerrado de manera absoluta todos los domingos del año, parámetro esencial a considerar en la distribución de los días del itinerario."
  },
  {
    "id": "t2",
    "dia": 1,
    "fecha": "18/9",
    "nombre": "Civitatis: Free Tour Barcelona (General)",
    "lat": 41.3870,
    "lng": 2.1700,
    "tiempo": "10:00 - 12:00",
    "descripcion": "Duración de 2:00 hs para conocer la historia y puntos principales del centro urbano.",
    "imagen": "https://images.unsplash.com/photo-1522885140904-7b92dbb3e171?w=800",
    "isFreeTour": true,
    "link": "https://www.civitatis.com/ar/barcelona/free-tour-barcelona/",
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Placa+de+Catalunya+Barcelona",
    "viability": {
      "horario": "Programas de 9:00 a 19:00 hs.",
      "tarifas": "Free tour."
    },
    "viability_full": "Información de Civitatis sobre el Free Tour Barcelona (General):\n* Duración: 2 horas.\n* Horario de Salida: De 09:00 a 19:00 hs (frecuencias cada hora y algunas medias horas).\n* Enlace Oficial: https://www.civitatis.com/ar/barcelona/free-tour-barcelona/\n\nOpera bajo la modalidad de free walking tour (se basa en propinas al guía). Se recomienda realizar reserva digital previa para asegurar el cupo del grupo."
  },
  {
    "id": "t3",
    "dia": 1,
    "fecha": "18/9",
    "nombre": "Almuerzo en el Mercado de la Boquería",
    "lat": 41.3819,
    "lng": 2.1720,
    "tiempo": "12:00 - 13:30",
    "descripcion": "Horario oficial de 8:00 a 20:30. Ubicado en este día para evitar el domingo (cierre absoluto).",
    "imagen": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Mercado+de+la+Boqueria+Barcelona",
    "viability": {
      "horario": "Lun-Sáb: 8:00 - 20:30.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Las Ramblas y Mercado de la Boquería:\n* Mercado de la Boquería: Abierto de lunes a sábado de 08:00 a 20:30. Acceso libre y gratuito.\n* Cierre Dominical Crítico: Permanece cerrado de manera absoluta todos los domingos del año, parámetro esencial a considerar en la distribución de los días. Se programó el viernes para asegurar la experiencia de almuerzo familiar."
  },
  {
    "id": "t4",
    "dia": 1,
    "fecha": "18/9",
    "nombre": "Catedral de Barcelona",
    "lat": 41.3839,
    "lng": 2.1764,
    "tiempo": "13:30 - 15:00",
    "descripcion": "Visita de 1.5 hs en horario laborable (9:30 a 18:30). Incluye nave central, coro, claustro de las trece ocas, museo y azotea.",
    "imagen": "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Catedral+de+Barcelona",
    "viability": {
      "horario": "Lun-Vie: 9:30-18:30 | Dom: 14:00-17:00.",
      "tarifas": "€16.00."
    },
    "viability_full": "Catedral de Barcelona (Santa Cruz y Santa Eulalia):\n* Horario Turístico en Septiembre: Lunes a viernes de 09:30 a 18:30 (último acceso 17:45). Domingos en horario reducido de 14:00 a 17:00.\n* Tarifa Cultural: €16.00 por entrada (incluye el acceso a la nave central, el coro de sillería de madera, el claustro de las 13 ocas, el Museo Capitular y el mirador de la azotea mediante ascensor).\n* Acceso de Culto: Gratuito a primera hora de la mañana y última hora de la tarde, limitado estrictamente a zonas de rezo (no permite el recorrido cultural ni el acceso a las cubiertas)."
  },
  {
    "id": "t5",
    "dia": 1,
    "fecha": "18/9",
    "nombre": "Templo Romano de Augusto",
    "lat": 41.3835,
    "lng": 2.1772,
    "tiempo": "15:00 - 15:45",
    "descripcion": "Visita breve en el monte Táber (Barrio Gótico). Acceso gratuito.",
    "imagen": "https://images.unsplash.com/photo-1617478672957-e6128084a919?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Templo+Romano+de+Augusto+Barcelona",
    "viability": {
      "horario": "Mar-Sáb: 10:00-19:00 | Dom: 10:00-20:00 | Lun: 10:00-14:00.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Templo Romano de Augusto:\n* Acceso: Público y 100% gratuito.\n* Horarios (MUHBA): Martes a sábado de 10:00 a 19:00, domingos de 10:00 a 20:00 y lunes de 10:00 a 14:00.\n* Ubicación: Patio medieval de la calle Paradís (punto más alto del monte Táber en el barrio Gótico). Consta de cuatro columnas estriadas corintias del templo romano de Barcino."
  },
  {
    "id": "t6",
    "dia": 1,
    "fecha": "18/9",
    "nombre": "Paseo por el Born",
    "lat": 41.3838,
    "lng": 2.1785,
    "tiempo": "16:00 - 18:00",
    "descripcion": "Tarde libre para perderse por las estrechas callejuelas medievales del Born, disfrutando de su ambiente bohemio, sus tiendas de diseño y pequeños cafés.",
    "imagen": "https://images.unsplash.com/photo-1558642084-fd074ec4bd2d?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=El+Born+Barcelona",
    "viability": {
      "horario": "Paseo libre",
      "tarifas": "Gratuito"
    },
    "viability_full": "Paseo libre a pie por el barrio del Born. Recorrido sin restricciones de horario."
  },
  {
    "id": "t7",
    "dia": 1,
    "fecha": "18/9",
    "nombre": "Basílica de Santa María del Mar y entorno",
    "lat": 41.3836,
    "lng": 2.1821,
    "tiempo": "18:00 en adelante",
    "descripcion": "Paseo por el Born. Opción de visitar el vestíbulo del antiguo Mercado del Born o realizar la visita cultural a las criptas y cubiertas de la Basílica.",
    "imagen": "https://images.unsplash.com/photo-1608958296316-dbb5a939fcc0?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Basilica+de+Santa+Maria+del+Mar+Barcelona",
    "viability": {
      "horario": "Mercado del Born: Mar-Dom 10:00-20:00.",
      "tarifas": "Liturgia gratis | Cubiertas: €10.00."
    },
    "viability_full": "Barrio Gótico y El Born:\n* Basílica de Santa María del Mar: Acceso gratuito para liturgia y oración. La visita cultural guiada que incluye el ascenso a las cubiertas y acceso a las criptas tiene un coste de €10.00.\n* El Born Centre de Cultura i Memòria: Acceso libre y gratuito de martes a domingo al vestíbulo principal del edificio (estructura de hierro de antiguo mercado) para contemplar las ruinas arqueológicas de 1714."
  },
  {
    "id": "t8",
    "dia": 2,
    "fecha": "19/9",
    "nombre": "Park Güell (Zona Monumental)",
    "lat": 41.4145,
    "lng": 2.1527,
    "tiempo": "09:30 - 11:00",
    "descripcion": "Acceso a primera hora (9:30 am) para mitigar las temperaturas y la masificación.",
    "imagen": "https://images.unsplash.com/photo-1507504038482-76210214dae1?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Park+Guell+Barcelona",
    "viability": {
      "horario": "9:30 - 19:30.",
      "tarifas": "€18.00."
    },
    "viability_full": "Park Güell:\n* Regulación de Aforo: Control de acceso a la Zona Monumental regulado con un cupo máximo de 1,400 visitantes por hora. Se requiere reserva en línea anticipada.\n* Horarios en Septiembre: El horario de explotación comercial turística comienza a las 09:30 y finaliza a las 19:30, permitiéndose la estancia dentro del recinto hasta el anochecer.\n* Acceso Vecinal Restringido: El acceso fuera de estas horas comerciales, específicamente en los programas denominados \"Bon Dia Barcelona\" (de 07:00 a 09:30) y \"Bon Vespre Barcelona\" (de 20:00 a 22:00), está reservado de manera exclusiva para los ciudadanos inscritos en el padrón vecinal o registrados en la iniciativa municipal Gaudir Més, quedando estrictamente prohibida la entrada de turistas durante dichos intervalos.\n* Política de Impuntualidad: La impuntualidad en la hora reservada (con un margen de cortesía de solo 30 minutos) anula la validez del billete sin derecho a devolución."
  },
  {
    "id": "t9",
    "dia": 2,
    "fecha": "19/9",
    "nombre": "Civitatis: Free Tour Parque Güell",
    "lat": 41.4135,
    "lng": 2.1518,
    "tiempo": "11:00 - 12:30",
    "descripcion": "Duración fija de 1:30 hs conectando directamente dentro del recinto.",
    "imagen": "https://images.unsplash.com/photo-1587974928442-77ad9e2db5ad?w=800",
    "isFreeTour": true,
    "link": "https://www.civitatis.com/ar/barcelona/free-tour-parque-guell/",
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Park+Guell+Barcelona",
    "viability": {
      "horario": "Salida a las 11:00 hs.",
      "tarifas": "Free tour."
    },
    "viability_full": "Free Tour Parque Güell de Civitatis:\n* Duración: 1 hora 30 minutos.\n* Horario de Salida: 11:00 hs.\n* Enlace Oficial: https://www.civitatis.com/ar/barcelona/free-tour-parque-guell/\n\nNota Crítica: Este tour no incluye el ticket de entrada comercial al Park Güell, el cual debe adquirirse por separado online para poder acceder a la zona monumental con el grupo."
  },
  {
    "id": "t10",
    "dia": 2,
    "fecha": "19/9",
    "nombre": "Almuerzo en el Barrio de Gracia",
    "lat": 41.4022,
    "lng": 2.1573,
    "tiempo": "12:30 - 14:30",
    "descripcion": "Descenso peatonal hacia las terrazas locales de la Plaza del Sol o de la Virreina.",
    "imagen": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Plaza+del+Sol+Gracia+Barcelona",
    "viability": {
      "horario": "Libre 24 hs.",
      "tarifas": "Consumo de restauración libre."
    },
    "viability_full": "Barrio de Gracia:\n* Acceso: Plazas peatonales de acceso libre las 24 horas (como plaza del Sol o plaza de la Virreina).\n* Viabilidad: Ideal para terrazas de restauración local con cocina autóctona y ambiente de barrio."
  },
  {
    "id": "t11",
    "dia": 2,
    "fecha": "19/9",
    "nombre": "Excursión al Tibidabo (Zona y Templo)",
    "lat": 41.4223,
    "lng": 2.1186,
    "tiempo": "14:30 - 17:30",
    "descripcion": "Subida en el funicular de alta velocidad Cuca de Llum. Visita gratuita a la cripta inferior y nave del Templo Expiatorio del Sagrado Corazón de Jesús.",
    "imagen": "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Templo+del+Sagrado+Corazon+de+Jesus+Tibidabo+Barcelona",
    "viability": {
      "horario": "Ascensor: Mié-Dom 10:30-18:45.",
      "tarifas": "Templo gratis | Ascensor: €4.50 aprox | Parque: €39.00."
    },
    "viability_full": "Tibidabo y Templo del Sagrado Corazón de Jesús:\n* Templo: Acceso gratuito a cripta y nave principal.\n* Ascensor panorámico al mirador de la estatua del Salvador: Operativo de miércoles a domingo de 10:30 a 18:45 por una tarifa de €4.00 - €5.00 (compra en máquinas automáticas del recinto).\n* Parque de Atracciones Tibidabo: En septiembre abre únicamente fines de semana y festivos (11:00 a 21:00), además de jornadas puntuales (2, 3, 4 y 25 de septiembre). Entrada general con funicular \"Cuca de Llum\" incluido: €39.00."
  },
  {
    "id": "t12",
    "dia": 2,
    "fecha": "19/9",
    "nombre": "Traslado directo al Paseo de Gracia",
    "lat": 41.3917,
    "lng": 2.1649,
    "tiempo": "17:30 - 18:15",
    "descripcion": "Descenso de la montaña hacia el eje modernista central.",
    "imagen": "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Paseo+de+Gracia+Barcelona",
    "viability": {
      "horario": "Frecuencia regular.",
      "tarifas": "Transporte estándar (€2.50)."
    },
    "viability_full": "Descenso peatonal y de conexión desde la montaña del Tibidabo hacia el Paseo de Gracia. Agrupación geográfica óptima para iniciar las visitas modernistas de la tarde."
  },
  {
    "id": "t13",
    "dia": 2,
    "fecha": "19/9",
    "nombre": "La Pedrera / Casa Milà",
    "lat": 41.3954,
    "lng": 2.1649,
    "tiempo": "18:15 - 20:15",
    "descripcion": "Visita diurna esencial. Entrada pasadas las 18:00 hs para aprovechar la iluminación óptima del atardecer en la azotea de los guerreros.",
    "imagen": "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=La+Pedrera+Barcelona",
    "viability": {
      "horario": "Diurno hasta 20:30 hs | Nocturno 20:40-22:20 hs.",
      "tarifas": "€25.00 diurno | €39.00 nocturno."
    },
    "viability_full": "La Pedrera (Casa Milà):\n* Apodo Histórico: Conocida satíricamente como \"La Cantera\" debido a su fachada ondulada de piedra caliza. Última obra civil de Gaudí.\n* Horarios en Septiembre: Abierta para visitas diurnas hasta las 20:30 (horario de verano). Las visitas nocturnas (La Pedrera Night Experience) operan de 20:40 a 22:20.\n* Recorrido Básico: Incluye el patio de luces, el piso de los inquilinos (recrea la vida burguesa a principios del siglo XX), el Espai Gaudí en el desván de arcos catenarios de ladrillo, y la azotea de los guerreros.\n* Experiencia Nocturna (Night Experience): Propone un itinerario guiado en grupos reducidos que culmina con una proyección audiovisual sobre las chimeneas y una copa de cava en los patios interiores.\n* Tarifas Online: €25.00 diurno, €39.00 nocturno.\n* Recomendación: El pase de tarde (después de las 17:00 hs) ofrece la iluminación más espectacular para fotografías en la azotea."
  },
  {
    "id": "t14",
    "dia": 2,
    "fecha": "19/9",
    "nombre": "Cena en El Nacional",
    "lat": 41.3895,
    "lng": 2.1668,
    "tiempo": "20:15 en adelante",
    "descripcion": "Cena en el multiespacio gastronómico modernista de estética industrial (acceso libre sin reserva).",
    "imagen": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=El+Nacional+Barcelona",
    "viability": {
      "horario": "12:00 a 24:00 hs.",
      "tarifas": "Entrada libre sin reserva."
    },
    "viability_full": "El Nacional:\n* Acceso: Entrada libre y sin reserva previa para el acceso a las instalaciones.\n* Interés: Antigua nave industrial del siglo XIX (antiguo teatro y garaje) reconvertida por el interiorista Lázaro Rosa-Violán en un multiespacio de restauración de estética modernista. Cuenta con cuatro restaurantes temáticos y cuatro barras de bebidas."
  },
  {
    "id": "t15",
    "dia": 5,
    "fecha": "22/9",
    "nombre": "Palau de la Música Catalana",
    "lat": 41.3875,
    "lng": 2.1753,
    "tiempo": "09:30 - 11:00",
    "descripcion": "Visita turística diurna autoguiada en su horario de mañana.",
    "imagen": "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Palau+de+la+Musica+Catalana+Barcelona",
    "viability": {
      "horario": "9:00 - 15:30 hs.",
      "tarifas": "€16.00 online."
    },
    "viability_full": "Palau de la Música Catalana:\n* Acceso: Visitas turísticas diurnas de lunes a domingo de 09:00 a 15:30.\n* Tarifas: €16.00 con audioguía interactiva si se adquiere online anticipadamente (asciende a €20.00-€22.00 por otros canales de reventa).\n* Cafè Palau: Ubicado en el vestíbulo del edificio con columnas de mosaicos; acceso libre operativo de 09:00 a 24:00."
  },
  {
    "id": "t32",
    "dia": 3,
    "fecha": "20/9",
    "nombre": "Barça Immersive Tour",
    "lat": 41.3809,
    "lng": 2.1228,
    "tiempo": "09:30 - 11:30",
    "descripcion": "Visita al museo del Barça. Tickets ya adquiridos para la franja de las 09:30 hs.",
    "imagen": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Barca+Immersive+Tour+Museu+del+FC+Barcelona",
    "viability": {
      "horario": "Ya Reservado (09:30 hs)",
      "tarifas": "Total pagado €154.50"
    },
    "viability_full": "FC Barcelona - Barça Immersive Tour:\n* Estado: Tickets ya reservados y pagados (Total: €154.50) para el ingreso a las 09:30 hs. Duración estimada de la visita: 2 horas.\n* Obras del Estadio Camp Nou: El recorrido tradicional por el estadio está suspendido debido a reconstrucción. Se visita la gran exposición interactiva provisional de 2,400 m² junto al Palau Blaugrana.\n* Inclusiones de la Visita: Museo del Club (trofeos de Champions, balones de oro, camisetas), Spotify Camp Nou Live (sala inmersiva 360 grados y sonido envolvente), Mirador de la Reconstrucción (plataforma elevada exterior para observar las obras en el estadio) y desafíos interactivos (RoboKeeper, realidad virtual Barça Virtual Dream)."
  },
  {
    "id": "t17",
    "dia": 3,
    "fecha": "20/9",
    "nombre": "Plaza de España",
    "lat": 41.3750,
    "lng": 2.1491,
    "tiempo": "11:30 - 12:00",
    "descripcion": "Visita a la zona monumental de la plaza.",
    "imagen": "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Plaza+de+Espana+Barcelona",
    "viability": {
      "horario": "Acceso libre.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Plaza de España, punto de inicio para ascender a Montjuïc, rodeada de las Torres Venecianas."
  },
  {
    "id": "t18",
    "dia": 3,
    "fecha": "20/9",
    "nombre": "Mirador del Centro Comercial Arenas",
    "lat": 41.3761,
    "lng": 2.1495,
    "tiempo": "12:00 - 12:30",
    "descripcion": "Ascenso gratuito por escaleras mecánicas interiores para una vista panorámica de 360 grados.",
    "imagen": "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Centro+Comercial+Arenas+Barcelona",
    "viability": {
      "horario": "9:00 - 22:00 hs.",
      "tarifas": "Gratis por escaleras internas | €1.00 por ascensor externo."
    },
    "viability_full": "Plaza de España y Centro Comercial Arenas:\n* Mirador de Arenas: Terraza superior circular de 360 grados de la antigua plaza de toros.\n* Ascenso gratuito: A través de las escaleras mecánicas interiores del centro comercial.\n* Ascensor exterior: El ascensor acristalado exterior tiene una tarifa de €1.00 por viaje."
  },
  {
    "id": "t_poble",
    "dia": 3,
    "fecha": "20/9",
    "nombre": "Poble Espanyol y Almuerzo",
    "lat": 41.3687,
    "lng": 2.1472,
    "tiempo": "12:30 - 15:30",
    "descripcion": "Visita de 2h30m al recinto y 30 minutos extras para almorzar dentro.",
    "imagen": "https://images.unsplash.com/photo-1587330933367-183cb53a5f54?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Poble+Espanyol+Barcelona",
    "viability": {
      "horario": "10:00 - 20:00 hs.",
      "tarifas": "€56.40 (ticket grupo anticipado)."
    },
    "viability_full": "Poble Espanyol:\n* Museo arquitectónico al aire libre ubicado en Montjuïc.\n* Entrada anticipada obligatoria para asegurar disponibilidad.\n* Dentro del recinto hay múltiples opciones de restauración para almorzar."
  },
  {
    "id": "t19",
    "dia": 3,
    "fecha": "20/9",
    "nombre": "Traslado al Castillo (Bus 150)",
    "lat": 41.3690,
    "lng": 2.1560,
    "tiempo": "15:30 - 16:00",
    "descripcion": "Uso del Autobús 150 desde Plaza de España directo hasta la cumbre de la montaña.",
    "imagen": "https://images.unsplash.com/photo-1612456425712-4c281df6fa30?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Castillo+de+Montjuic+Barcelona",
    "viability": {
      "horario": "Frecuencia regular.",
      "tarifas": "Sencillo (€2.50)."
    },
    "viability_full": "Traslado y Logística a Montjuïc:\n* Acceso sugerido: Se puede subir cómodamente en el autobús 150 desde Plaza de España directo a la cumbre de la montaña, o combinando el Funicular + el Teleférico de Montjuïc (TMB) que conecta con la estación superior Castell."
  },
  {
    "id": "t20",
    "dia": 3,
    "fecha": "20/9",
    "nombre": "Castillo de Montjuïc",
    "lat": 41.3638,
    "lng": 2.1666,
    "tiempo": "16:00 - 18:00",
    "descripcion": "Entrada gratuita (domingos a partir de las 15:00 hs). Tiempo para recorrer las murallas, patio de armas y el mirador de 360 grados.",
    "imagen": "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Castillo+de+Montjuic+Barcelona",
    "viability": {
      "horario": "10:00 - 20:00 hs.",
      "tarifas": "€12.00 general | Gratis domingos desde las 15:00 hs."
    },
    "viability_full": "Castillo de Montjuïc:\n* Mirador: Excelente mirador de 360 grados de la ciudad, el puerto y el litoral marítimo.\n* Horarios en Septiembre: Lunes a domingo de 10:00 a 20:00 (último acceso 30 min antes).\n* Tarifas: Entrada general €12.00, tarifa reducida €8.00.\n* Gratuidad: Gratuito los domingos a partir de las 15:00 hs y todo el primer domingo de cada mes. Se recomienda reservar de 1.5 a 2 horas para la visita."
  },
  {
    "id": "t21",
    "dia": 3,
    "fecha": "20/9",
    "nombre": "Descenso a pie por Montjuïc",
    "lat": 41.3680,
    "lng": 2.1590,
    "tiempo": "18:00 - 19:30",
    "descripcion": "Caminata cuesta abajo cruzando los jardines perimetrales y miradores hacia la base de la colina.",
    "imagen": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Castillo+de+Montjuic+Barcelona",
    "viability": {
      "horario": "Paseo diurno.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Logística en Montjuïc: Se recomienda reservar entre 1.5 y 2 horas para pasear y realizar el descenso caminando cuesta abajo desde el castillo, cruzando los miradores de Miramar y jardines perimetrales hacia la base."
  },
  {
    "id": "t22",
    "dia": 3,
    "fecha": "20/9",
    "nombre": "Cena de Pinchos en Poble Sec (Carrer Blai)",
    "lat": 41.3742,
    "lng": 2.1627,
    "tiempo": "19:30 - 21:15",
    "descripcion": "Eje gastronómico de pinchos a bajo coste (€1.00 a €3.00 por unidad) en horario de tarde-noche.",
    "imagen": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Carrer+de+Blai+Barcelona",
    "viability": {
      "horario": "Tarde-noche.",
      "tarifas": "Pinchos: €1.00 - €3.00."
    },
    "viability_full": "Poble Sec, Poblenou y Barceloneta:\n* Carrer Blai (Poble Sec): Zona popular de tapeo y pinchos a bajo coste (de €1.00 a €3.00 por unidad) operativa tarde-noche. Ideal para cena gastronómica en un ambiente familiar informal."
  },
  {
    "id": "t23",
    "dia": 3,
    "fecha": "20/9",
    "nombre": "Espectáculo de la Fuente Mágica",
    "lat": 41.3712,
    "lng": 2.1517,
    "tiempo": "21:30 - 22:30",
    "descripcion": "Ubicación en las escalinatas del Palacio Nacional (MNAC) para presenciar las coreografías operativas de agua, luz y música en domingos de septiembre.",
    "imagen": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Fuente+Magica+de+Montjuic+Barcelona",
    "viability": {
      "horario": "Jue-Sáb 21:00-22:00 o Mié-Dom 21:30-22:30.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Montjuïc y la Fuente Mágica:\n* Reapertura de la Fuente: Restablecida tras casi tres años de inactividad por sequía extrema y modernización. Cuenta con un sistema optimizado de menor consumo hídrico.\n* Horario de Espectáculos en Septiembre: Se programan de jueves a sábado entre las 21:00 y las 22:00, o de miércoles a domingo de 21:30 a 22:30 (sujeto a transición de horarios de la corporación municipal). Acceso libre y gratuito.\n* Ubicación recomendada: Escalinatas del Palacio Nacional (MNAC) para ver la perspectiva de fondo."
  },
  {
    "id": "t24",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Arco del Triunfo",
    "lat": 41.3910,
    "lng": 2.1806,
    "tiempo": "09:30 - 10:00",
    "descripcion": "Punto de encuentro e inicio del recorrido.",
    "imagen": "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Arco+de+Triunfo+de+Barcelona",
    "viability": {
      "horario": "24 hs.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Arco del Triunfo de Barcelona: punto de encuentro e inicio del recorrido. Fue construido como entrada principal de la Exposición Universal de 1888."
  },
  {
    "id": "t24a",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Jardines de la Ciudadela",
    "lat": 41.3888,
    "lng": 2.1849,
    "tiempo": "10:00 - 10:30",
    "descripcion": "Primer tramo del paseo. Ocupa antiguos terrenos de la fortaleza militar.",
    "imagen": "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Parc+de+la+Ciutadella",
    "viability": {
      "horario": "08:00 - 22:30 hs.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Jardines del Parque de la Ciudadela: primer tramo del paseo tras atravesar el entorno del Arco del Triunfo."
  },
  {
    "id": "t24b",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Invernaderos",
    "lat": 41.3877,
    "lng": 2.1839,
    "tiempo": "10:30 - 11:00",
    "descripcion": "Espacios botánicos decimonónicos y de plantas exóticas.",
    "imagen": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Hivernacle+Parc+de+la+Ciutadella",
    "viability": {
      "horario": "08:00 - 22:30 hs.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Invernaderos de plantas exóticas y tropicales: espacios botánicos del parque que introducen el carácter ajardinado y decimonónico."
  },
  {
    "id": "t24c",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Cascada Monumental",
    "lat": 41.3881,
    "lng": 2.1875,
    "tiempo": "11:00 - 11:30",
    "descripcion": "Diseñada por Josep Fontserè, parada clave para observar la monumentalidad.",
    "imagen": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Cascada+Monumental+Ciutadella",
    "viability": {
      "horario": "08:00 - 22:30 hs.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Cascada Monumental: uno de los elementos más fotogénicos del parque. Fue diseñada por Josep Fontserè."
  },
  {
    "id": "t24d",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Parlamento de Cataluña",
    "lat": 41.3881,
    "lng": 2.1889,
    "tiempo": "11:30 - 12:00",
    "descripcion": "Edificio de alto valor político e histórico en el centro del parque.",
    "imagen": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Parlament+de+Catalunya",
    "viability": {
      "horario": "Consultar visitas",
      "tarifas": "Gratuito exterior."
    },
    "viability_full": "Parlamento de Cataluña: edificio de alto valor político, militar e histórico, ideal para contextualizar la evolución institucional."
  },
  {
    "id": "t24e",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Barceloneta",
    "lat": 41.3807,
    "lng": 2.1895,
    "tiempo": "12:00 - 12:30",
    "descripcion": "Etapa final del recorrido, tradición marinera y portuaria.",
    "imagen": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Barceloneta+Barcelona",
    "viability": {
      "horario": "24 hs.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Barrio de la Barceloneta: etapa final del recorrido, donde la ciudad se vincula directamente con el mar Mediterráneo."
  },
  {
    "id": "t24f",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Frente marítimo",
    "lat": 41.3833,
    "lng": 2.1950,
    "tiempo": "12:30 - 13:00",
    "descripcion": "Legado olímpico de 1992 y gran transformación urbanística litoral.",
    "imagen": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Port+Olimpic+Barcelona",
    "viability": {
      "horario": "24 hs.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Frente marítimo y legado olímpico de 1992: cierre natural del paseo por la Barceloneta."
  },
  {
    "id": "t26",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Almuerzo en La Barceloneta",
    "lat": 41.3784,
    "lng": 2.1925,
    "tiempo": "13:00 - 15:00",
    "descripcion": "Tiempo libre para gastronomía marinera tradicional y arroces.",
    "imagen": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=La+Barceloneta+Barcelona",
    "viability": {
      "horario": "Almuerzos al mediodía.",
      "tarifas": "Consumo de restauración libre."
    },
    "viability_full": "Poble Sec, Poblenou y Barceloneta:\n* La Barceloneta: Antiguo barrio marinero de cuadrícula, muy popular por su amplia oferta de gastronomía mediterránea tradicional, mariscos y paellas frente a la costa."
  },
  {
    "id": "t27",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Transbordador Aeri del Port",
    "lat": 41.3732,
    "lng": 2.1884,
    "tiempo": "15:00 - 15:45",
    "descripcion": "Trayecto en cabina histórica suspendida sobre el agua desde la Torre de Sant Sebastià hasta la ladera de Montjuïc (compra física obligatoria el mismo día).",
    "imagen": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Torre+de+Sant+Sebastia+Transbordador+Aeri+del+Port",
    "viability": {
      "horario": "1-11 Sept: 10:30-20:00 | 12-30 Sept: 10:30-19:00.",
      "tarifas": "Ida: €12.50 | Ida/Vuelta: €20.00."
    },
    "viability_full": "Estudio Técnico del Transbordador Aeri del Port (Privado):\n* Cabinas: Históricas de gran tamaño octogonales (rojas y blancas, hasta 20 personas de pie) suspendidas sobre el mar y el puerto.\n* Recorrido: 1.3 km de trazado cruzando el Port Vell desde la playa de Barceloneta a Montjuïc.\n* Estaciones: Torre de Sant Sebastià (Barceloneta) y Estación de Miramar (Montjuïc). La estación intermedia Torre de Jaume I permanece cerrada.\n* Horario en Septiembre: Del 1 al 11 de septiembre de 10:30 a 20:00; del 12 al 30 de septiembre de 10:30 a 19:00.\n* Tarifas: Ida €12.50, viaje de ida y vuelta €20.00. Menores de 6 años gratis.\n* Logística Crítica: Las entradas no se pueden comprar online; compra exclusiva en taquilla física el mismo día. No adaptado para personas con movilidad reducida debido al diseño histórico de accesos, pasarelas y torres."
  },
  {
    "id": "t28",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Traslado al Paseo de Gracia",
    "lat": 41.3917,
    "lng": 2.1649,
    "tiempo": "15:45 - 16:30",
    "descripcion": "Conexión rápida hacia el centro monumental.",
    "imagen": "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Paseo+de+Gracia+Barcelona",
    "viability": {
      "horario": "Frecuencia regular.",
      "tarifas": "Sencillo (€2.50)."
    },
    "viability_full": "Traslado y conexión rápida en transporte público desde la estación de Miramar de Montjuïc hacia el Paseo de Gracia."
  },
  {
    "id": "t29",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Casa Batlló",
    "lat": 41.3917,
    "lng": 2.1649,
    "tiempo": "18:00 - 19:30",
    "descripcion": "Recorrido interior con audioguía inteligente. Tickets ya adquiridos para la franja de las 18:00 hs.",
    "imagen": "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Casa+Batllo+Barcelona",
    "viability": {
      "horario": "Ya Reservado (18:00 hs)",
      "tarifas": "Total pagado €117"
    },
    "viability_full": "Casa Batlló:\n* Ubicación: En la \"Manzana de la Discordia\" en Paseo de Gracia.\n* Estado: Tickets ya reservados y pagados (Total: €117) para el ingreso a las 18:00 hs. Duración estimada de la visita: 1 hora y 30 minutos.\n* Inclusiones: Visita interior con audioguía de realidad aumentada inteligente, acceso al Gaudí Cube (espacio de proyección LED inmersivo diseñado por Refik Anadol) y azotea."
  },
  {
    "id": "t30",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Casa Amatller",
    "lat": 41.3915,
    "lng": 2.1651,
    "tiempo": "16:30 - 17:45",
    "descripcion": "Visita autoguiada interactiva con taza de chocolate caliente tradicional al final (cierre a las 19:00).",
    "imagen": "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Casa+Amatller+Barcelona",
    "viability": {
      "horario": "10:00 - 19:00 hs.",
      "tarifas": "€21.00 a €25.00 online."
    },
    "viability_full": "Casa Amatller:\n* Horario: Lunes a domingo de 10:00 a 19:00.\n* Tarifas: Entrada general de €21.00 a €25.00 online (incluye tableta interactiva para la visita autoguiada y una taza de chocolate caliente tradicional de la marca Amatller al finalizar el recorrido).\n* Gratuidad: Los menores de 7 años entran gratis."
  },
  {
    "id": "t31",
    "dia": 4,
    "fecha": "21/9",
    "nombre": "Tarde/Noche Libre",
    "lat": 41.3917,
    "lng": 2.1649,
    "tiempo": "19:30 en adelante",
    "descripcion": "Paseo por los pavimentos de Gaudí y farolas de Pere Falqués en Paseo de Gracia.",
    "imagen": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Paseo+de+Gracia+Barcelona",
    "viability": {
      "horario": "Libre 24 hs.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Paseo de Gracia: Eje modernista central de acceso libre y transitable las 24 horas, ideal para ver el diseño de los pavimentos (panots de Gaudí) y las farolas modernistas diseñadas por Pere Falqués."
  },
  {
    "id": "t33",
    "dia": 5,
    "fecha": "22/9",
    "nombre": "Biblioteca Gabriel García Márquez",
    "lat": 41.4172731,
    "lng": 2.1999626,
    "tiempo": "12:00 - 13:30",
    "descripcion": "Visita a la espectacular biblioteca pública galardonada como la mejor del mundo en 2023. Destaca por su icónico diseño arquitectónico de madera y su especialización en literatura latinoamericana.",
    "imagen": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/place/Biblioteca+Gabriel+Garc%C3%ADa+M%C3%A1rquez/@41.4172731,2.1999626,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a397db7a8a6b:0x82a6835eee60e570!8m2!3d41.4172731!4d2.1999626!16s%2Fg%2F11h79qxdww!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwOS4wIKXMDSoASAFQAw%3D%3D",
    "viability": {
      "horario": "Mar-Jue-Vie: 9:30-20:30 | Lun-Mié: 9:30-13:30, 15:30-20:30 | Sáb: 10:00-14:00, 16:00-20:00 | Dom: 10:00-14:00.",
      "tarifas": "Acceso gratuito."
    },
    "viability_full": "Biblioteca Gabriel García Márquez:\n* Reconocimiento: Galardonada como la mejor biblioteca pública del mundo en 2023 por la IFLA.\n* Arquitectura: Impresionante diseño geométrico sostenible con estructura de madera visible, que se asemeja a hojas de libros abiertas.\n* Horario de Apertura el Martes: De 9:30 a 20:30 hs. Ideal para la visita al mediodía (12:00 - 13:30 hs).\n* Tarifas: Acceso 100% libre y gratuito."
  },
  {
    "id": "t33b",
    "dia": 5,
    "fecha": "22/9",
    "nombre": "Almuerzo y Traslado",
    "lat": 41.4036,
    "lng": 2.1744,
    "tiempo": "13:30 - 15:45",
    "descripcion": "Tiempo libre para almorzar antes de ingresar a la Sagrada Familia.",
    "imagen": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Bas%C3%ADlica+de+la+Sagrada+Fam%C3%ADlia+Barcelona",
    "viability": {
      "horario": "Libre",
      "tarifas": "Consumo de restauración libre."
    },
    "viability_full": "Almuerzo cerca de la Sagrada Familia."
  },
  {
    "id": "t34",
    "dia": 5,
    "fecha": "22/9",
    "nombre": "Basílica de la Sagrada Familia",
    "lat": 41.4036,
    "lng": 2.1744,
    "tiempo": "15:45 - 18:00",
    "descripcion": "15:45 hs entrada general al templo. 17:15 hs subida a la Torre de la Pasión.",
    "imagen": "https://images.unsplash.com/photo-1585699324551-f6c309eed262?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Bas%C3%ADlica+de+la+Sagrada+Fam%C3%ADlia+Barcelona",
    "viability": {
      "horario": "Ya Reservado (15:45 hs)",
      "tarifas": "Total pagado €118"
    },
    "viability_full": "Basílica de la Sagrada Familia:\n* Estado: Tickets ya reservados y pagados (Total: €118) con entrada a las 15:45 hs y subida a la Torre de la Pasión a las 17:15 hs.\n* Horario de Apertura en Septiembre: Lunes a viernes de 09:00 a 20:00; sábados de 09:00 a 18:00; domingos de 10:30 a 20:00.\n* Restricción de Salud Importante: El ascenso no está recomendado para personas con movilidad reducida, problemas cardiovasculares, vértigo o claustrofobia, debido a que el descenso es peatonal por escaleras estrechas de caracol."
  },
  {
    "id": "t35",
    "dia": 5,
    "fecha": "22/9",
    "nombre": "Paseo por Poblenou",
    "lat": 41.4014,
    "lng": 2.2045,
    "tiempo": "18:00 - 19:00",
    "descripcion": "Merienda por la zona y recorrido hacia la Torre Glòries.",
    "imagen": "https://images.unsplash.com/photo-1522083165195-342750297f4e?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Rambla+del+Poblenou+Barcelona",
    "viability": {
      "horario": "Libre 24 hs.",
      "tarifas": "Gratuito."
    },
    "viability_full": "Poble Sec, Poblenou y Barceloneta:\n* Poblenou: Antiguo distrito fabril reconvertido en barrio moderno. Posee una gran fisionomía industrial, lofts y cafeterías de especialidad muy próximas a la playa de Bogatell. Acceso peatonal libre las 24 horas."
  },
  {
    "id": "t36",
    "dia": 5,
    "fecha": "22/9",
    "nombre": "Torre Glòries y Rambla de Poblenou",
    "lat": 41.4036,
    "lng": 2.1894,
    "tiempo": "19:00 - 20:30",
    "descripcion": "Subida a las 19:00 hs para ver el anochecer, terminando con un paseo nocturno por la Rambla de Poblenou.",
    "imagen": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
    "isFreeTour": false,
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Torre+Glories+Barcelona",
    "viability": {
      "horario": "10:00 - 21:00 hs.",
      "tarifas": "€18.00."
    },
    "viability_full": "Torre Glòries:\n* Características: Rascacielos diseñado por Jean Nouvel, característico por su silueta de bala y su iluminación exterior variable mediante paneles de vidrio.\n* Horarios en Septiembre: De lunes a domingo de 10:00 a 21:00.\n* Tarifas: El acceso básico (Hyperview Barcelona + Mirador de la planta 30 a 125 metros de altura) cuesta €18.00 online. El acceso a la escultura suspendida Cloud Cities requiere suplemento de pago directo."
  }
];
