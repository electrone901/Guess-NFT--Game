import {NFTStorage, File} from 'nft.storage';

const symbol = 'TUT';

const apiKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY4QTMwQzA1ZjY3RTc3NTc3MjI2RjBlOEFmNjQzODA4ZDc2MzA1ZTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNDEzMDUwNTkzMCwibmFtZSI6Im1pbnRfdHV0b3JpYWwifQ.jCpzhkEJdFPuM0NtKtJoywX__m6xrJuPRmbagccwarU';
const client = new NFTStorage({token: apiKey});

const uploadToIpfs = async (name, description, imgFile) => {
    const metadata = await client.store({
        name: name,
        description: description,
        image: new File([imgFile], imgFile.name, {type: imgFile.type}),
        symbol: symbol,
        decimals: 0,
        shouldPreferSymbol: false,
        isBooleanAmount: true,
        artifactUri: new File([imgFile], imgFile.name, {type: imgFile.type}),
        displayUri: new File([imgFile], imgFile.name, {type: imgFile.type}),
        thumbnailUri: new File([imgFile], imgFile.name, {type: imgFile.type}),
        creators: ['priyanshu'],
    });
    return metadata.url;
};

export {uploadToIpfs};
