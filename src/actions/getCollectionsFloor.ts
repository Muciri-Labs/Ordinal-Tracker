async function getCollectionsFloor(collectionIds: string[]) {
  // const testCollectionIds = [
  //   "d5fa049d404fad2dab14f151e2691e8c",
  //   "56f06febdbc15f51e655e18d21d6f6ac",
  //   "9920e0bc455a3a050a6f93e88114ecfd",
  //   "e16a193193e2eab0acb8ef2aa6058eb2",
  //   "a828e35745d5a16164512e80103ff3a3",
  //   "b6f9971f1849437e68cee6de14856666",
  //   "cf8c781ec971e79d2def03db10781527",
  //   "02fb3f1b0dfa26fd8729cda295523514",
  //   "8d16a725e15038c6b23ad92d7421f1a9",
  //   "4ea29c5f288a1aa509122098e65454df",
  //   "91126534003cd1d6b4813786ad5d82df",
  //   "82dbf7583850c8f5cebc49525e21eadd",
  //   "339ce87790907bcec5b54e7c3b67293a",
  //   "e571a0a52c711a5d77c71b4fb51e2004",
  //   "f9547678b2001d0b752bc783fa9abfef",
  //   "62fc883cf2154c3235d277ec36ff1a2c",
  //   "5af40671362cd3cc406940b1ce973a86",
  //   "698a7566674b866173ff8708544ca9db",
  //   "d524b510a44717ed9f5b2f7958f16d5f",
  //   "335040d799eab117abee10dd4db1269f",
  //   "a2f460381dde19135560c9f826a4d197",
  //   "a9cfc01bcd841d1b1259d3a9a2f541ad",
  //   "a491b7dddd4c39f9156fb8247130a441",
  //   "7762beac1e48f371bc9f0df54d0060f4",
  //   "c2508a248ae8e94394cd99951d8e09fa",
  //   "f2289afa97708b802bd1dd53e12d0a24",
  //   "aae1c556e170fe874764c7fabd204f08",
  //   "8fc313df5c4d45016d9d1bd9c0611767",
  //   "7c5a0e370b644d39566c4d5324cd08d7",
  //   "0083d62eb3fa27c35eb29e149a0e8088",
  //   "057521efcb1073d3fbb36f535f953e42",
  //   "ecefb10efef1c4098d0cbcbeac4edc7e",
  //   "e1d0295cd5cefcf29f13f9a6e0f54749",
  //   "6044677010f5f4cb4fbe49e5b4e74203",
  //   "f8e9d2d4662ce0612ec8865d7cae5832",
  //   "f4c6f3381cd6d70e8065cf2dafdb662c",
  //   "f2686d9566e5c469b78b310c13f8153a",
  // ];

  // const currentTime = Math.floor(Date.now() / 1000);
  // const oneHourBefore = currentTime - 3600;

  // const currentDate = new Date();
  // const sevenDaysBefore = new Date();
  // sevenDaysBefore.setDate(currentDate.getDate() - 7);

  // const fetchPromises = testCollectionIds.map(async (collectionId) => {
  //   const hourlyApiUrl = `https://api.simplehash.com/api/v0/nfts/floor_prices_v2/collection/${collectionId}/hourly?marketplace_ids=magiceden&from_timestamp=${oneHourBefore}&to_timestamp=${currentTime}`;
  //   const dailyApiUrl = `https://api.simplehash.com/api/v0/nfts/floor_prices_v2/collection/${collectionId}/daily?start_date=${
  //     sevenDaysBefore.toISOString().split("T")[0]
  //   }&end_date=${
  //     currentDate.toISOString().split("T")[0]
  //   }&marketplace_ids=magiceden`;

  //   try {
  //     const headers = new Headers();
  //     headers.append("x-api-key", process.env.SIMPLE_HASH ?? "");

  //     const hourlyResponse = await fetch(hourlyApiUrl, {
  //       method: "GET",
  //       headers: headers,
  //     });
  //     const dailyResponse = await fetch(dailyApiUrl, {
  //       method: "GET",
  //       headers: headers,
  //     });

  //     const hourlyData = await hourlyResponse.json();
  //     const dailyData = await dailyResponse.json();

  //     const currentFloorPrice = hourlyData.floor_prices[0]?.floor_price ?? null;
  //     const oneDayAgoFloorPrice =
  //       dailyData.floor_prices[1]?.floor_price ?? null;
  //     const sevenDaysAgoFloorPrice =
  //       dailyData.floor_prices[7]?.floor_price ?? null;

  //     const oneDFloor =
  //       oneDayAgoFloorPrice !== 0
  //         ? (
  //             ((currentFloorPrice - oneDayAgoFloorPrice) /
  //               oneDayAgoFloorPrice) *
  //             100
  //           ).toFixed(2) + "%"
  //         : "N/A";

  //     const sevenDFloor =
  //       sevenDaysAgoFloorPrice !== 0
  //         ? (
  //             ((currentFloorPrice - sevenDaysAgoFloorPrice) /
  //               sevenDaysAgoFloorPrice) *
  //             100
  //           ).toFixed(2) + "%"
  //         : "N/A";

  //     return {
  //       collection_id: collectionId,
  //       floor_price: currentFloorPrice,
  //       One_D_floor: oneDFloor,
  //       Seven_D_floor: sevenDFloor,
  //     };
  //   } catch (error) {
  //     console.error(
  //       `Error fetching data for collection ID ${collectionId}:`,
  //       error
  //     );
  //     return null;
  //   }
  // });

  // const floorPrices = await Promise.all(fetchPromises);

  // console.log("floorPrices", floorPrices);
  // // return floorPrices;

  const mockCollectionsFloor = collectionIds.map((id) => {
    const currentFloorPrice = Math.random() * 1000;
    const oneDayAgoFloorPrice = Math.random() * 1000;
    const sevenDaysAgoFloorPrice = Math.random() * 1000;

    const oneDFloor =
      (
        ((currentFloorPrice - oneDayAgoFloorPrice) / oneDayAgoFloorPrice) *
        100
      ).toFixed(2) + "%";
    const sevenDFloor =
      (
        ((currentFloorPrice - sevenDaysAgoFloorPrice) /
          sevenDaysAgoFloorPrice) *
        100
      ).toFixed(2) + "%";

    return {
      collection_id: id,
      floor_price: currentFloorPrice,
      One_D_floor: oneDFloor,
      Seven_D_floor: sevenDFloor,
    };
  });

  return mockCollectionsFloor;
}

export default getCollectionsFloor;