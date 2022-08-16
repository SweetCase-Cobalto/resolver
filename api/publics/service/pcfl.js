const formidable = require('formidable');
const exec = require('child_process').exec;
const fs = require('fs');

const pcfl = (req, res) => {
    /*
        파일을 사용한 작업이므로
        Json이 아닌 일반 Form을 사용합니다.

        File의 mimetype은 반드시 midi
    */
    const form = formidable({
        multiples: false,
        filter: ({name, originalFileName, mimetype}) => {
            return mimetype && mimetype.includes('audio/midi');
        }
    });
    form.parse(req, (err, field, file) => {
        if (err) {
            // Parsing Error
            next(err);
            res.status(400).json({'msg': '입력 데이터가 정상적이지 않습니다.'});
            return;
        }
        // interval 갖고오기
        const interval = parseFloat(field.interval);
        if (Number.isNaN(interval)) {
            res.status(400).json({'msg': '정수 또는 실수를 입력해야 합니다.'});
            return;
        }
        if (interval < 0.001 || interval > 0.5) {
            res.status(400).json({'msg': 'interval 범위는 0.001이상 0.5이하 입니다.'});
            return;
        }
        // 파일 데이터 갖고오기
        const fileData = file.file;
        const name = fileData.originalFilename;         // 파일 이름
        const tmpName = fileData.newFilename;           // 임시 Input 파일 이름
        const tmpPath = fileData.filepath;              // 임시 데이터가 저장되는 곳
        // 명령어 생성
        const cmd = `python submodules/PCFL/pcfl.py ${tmpPath} tmp/${tmpName} ${interval}`;
        exec(cmd, (e, out, stderr) => {
            // 명령어 실행을 통한 PCFL 작동
            if (stderr) res.status(400).json({'msg': stderr});
            else {
                // 작업 성공 시 다운로드
                res.status(200).download(`tmp/${tmpName}`, name, (err) => {
                    if (err) res.status(400).json({'msg': '파일 다운로드에 실패했습니다.'});
                    else {
                        res.end();
                        // 다운로드 후 임시파일 삭제
                        fs.unlink(`tmp/${tmpName}`, () => {
                            // Nothing
                            // TODO 추후에 로그 관련 데이터를 다룰 예정
                        });
                    }
                });
            }
        });
    });
}

module.exports = pcfl;