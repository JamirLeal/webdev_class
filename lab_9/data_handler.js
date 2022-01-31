const res = require('express/lib/response');
const fs = require('fs')

module.exports.save_data = async (file_name, data_to_parse) => {
    const result = await new Promise((resolve, reject) => {
        return fs.readFile(file_name, (err, data) => {  
                let res = "a";
                if (err) {
                    console.log(err);
                    return reject(err)
                } else {
                    obj = JSON.parse(data);
    
                    if (obj.reservations.length < 5) {
                        obj.reservations.push(data_to_parse);
                        res = "reserved";
                    } else {
                        obj.wait_list.push(data_to_parse);
                        res = "wait list";
                    }
    
                    let json = JSON.stringify(obj);
                    fs.writeFile(file_name, json, function(err, result) {
                        if(err) console.log('error', err);
                    });
                }
                return resolve(res); 
            });
    }); 
    return result;
}

module.exports.get_data = (file_name) => {
    let data = JSON.parse(fs.readFileSync(file_name,  
                function readFileCallback(err, data) {  
                    if (err) {
                        console.log(err);
                    } else {
                        obj = JSON.parse(data);
                        return obj;
                    } 
    }));
    return data;
}

module.exports.delete_data = (file_name) => {
    fs.exists(file_name, (exists) => {
        if (exists) {
            fs.readFile(file_name,  
                function readFileCallback(err, data) {  
                    if (err) {
                        console.log(err);
                    } else {
                        obj = JSON.parse(data);

                        obj.reservations.length = 0;
            
                        for (let i = 0; i < Math.min(5, obj.wait_list.length); i++) {
                            obj.reservations.push(obj.wait_list[0]);
                            obj.wait_list.shift();
                        }

                        let json = JSON.stringify(obj);
                        fs.writeFile(file_name, json, function(err, result) {
                            if(err) console.log('error', err);
                        });
                    } 
                })
        } else {
            console.log('file does not exist.')
        }
    })
}