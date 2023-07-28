import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList } from 'react-native'
import config from '../../config/config';
import { SessionContext } from '../SessionContext';


import moment from 'moment/moment';

moment.locale("id", {
    months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split(
        '_'
    ),
    monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
    weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
    weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
    weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [pukul] HH.mm',
        LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm',
    },
    meridiemParse: /pagi|siang|sore|malam/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        } else if (meridiem === 'siang') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'sore' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem: function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'siang';
        } else if (hours < 19) {
            return 'sore';
        } else {
            return 'malam';
        }
    },
    calendar: {
        sameDay: '[Hari ini pukul] LT',
        nextDay: '[Besok pukul] LT',
        nextWeek: 'dddd [pukul] LT',
        lastDay: '[Kemarin pukul] LT',
        lastWeek: 'dddd [lalu pukul] LT',
        sameElse: 'L',
    },
    relativeTime: {
        future: 'dalam %s',
        past: '%s yang lalu',
        s: 'beberapa detik',
        ss: '%d detik',
        m: 'semenit',
        mm: '%d menit',
        h: 'sejam',
        hh: '%d jam',
        d: 'sehari',
        dd: '%d hari',
        M: 'sebulan',
        MM: '%d bulan',
        y: 'setahun',
        yy: '%d tahun',
    },
    week: {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan 6th is the first week of the year.
    }
});

const ListData = (props) => {
    const tanggalwaktu = `${props.tanggal} ${props.waktu}`
    return (
        <View style={{
            backgroundColor: '#fff',
            paddingVertical: 20,
            marginHorizontal: 20,
            paddingHorizontal: 15,
            borderRadius: 15,
            marginTop: 20,
            elevation: 2
        }}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 15,
                textTransform: 'uppercase'
            }}>
                {moment(tanggalwaktu).format("LLLL")}
            </Text>
            <View style={{
                borderTopWidth: 1,
                borderTopColor: '#bdbdbd',
                borderStyle: 'dashed',
                paddingTop: 15,
                marginTop: 10
            }}>
                <Text style={{
                    fontSize: 15,
                    flex: 1,
                    textTransform: 'uppercase'
                }}>
                    {props.gerbang}
                </Text>
            </View>
        </View>
    );
};

const History = () => {

    const [data, setData] = useState([]);
    const session = useContext(SessionContext);

    useEffect(() => {
        const getData = async () => {
            try {
                await axios.get(config.history, {
                    headers: {
                        "Authorization": `Bearer ${session?.token}`
                    }
                }).then(response => {
                    if (typeof response?.data?.data !== "object") throw new Error(response);
                    setData(response?.data?.data);
                });
            } catch (error) {
                console.log(error);
            }

        };
        getData();
    }, []);

    return (
        <View style={{
            flex: 1,

        }}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ListData {...item} />}
            />
        </View>
    );
};

export default History;
