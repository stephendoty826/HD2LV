let myString = "access_token=sl.u.AFg9EWhO5Ta4wLFRm0LixhFSOcRAuYrbqFT5arpDigDKcioFcRIOlrjTWPwfGtO9Bd9TzEGTW2qbinVoZVc4C_bcVnaG65zm0WZ6cbAhPtlQ8I1nclxfdRrOLj3AVi3k7ifXFdv8R2P1DFRWE_bO4ZcnFvH0EDioz7dbloGRnV6S1njZt_1D1dgAl7r1YWohsaPuPT-FulIRvhNakU1xooRfCBkkVFWnEbKvpYZXPVUp1Zjn0rZHWcgyoWOweMnIOMnj2SO1QyA0ojJ2cT5LMmU1Rieh2GqB_qRoyD2TILTHGGJpnsgPHy6lMxbxv4YW0-_G_U4EKiB1gWX04nh504b8J-ee9HH4GPljXHap6iSirS7UgHaZdDtAlzoxOhte0BTPDuDGM9acY3727DLfzJSRaWXeOiokJ06frXqhZT0Zx3LXDMMT8grH8kwZJkH92J541lpuLRhWukDuihKQbqRDyjX5K_H-PYqKvUGpRyUmXhvCTwhPRIhdOT3xIBIMK9Ou2_mvv9W9ujF0emOYAc6UM6w_9YkRXj8adY0qQmeqWDBmcnSHaQZ_JgvKYQ3dya4QJJo4to3xHDN9AhgFeU4gjQqA4TVUjSbpjxdC0grEchOUiShSw3uq1pJ5IPbB5oiCFFeErJd6IwqxDwazw9maFjfGyd5XqTs1UEt1uo2NEZVQHwGdoFWlZiYkKTcvGHD_y7KjAt6D6ZFdy7aJnqJ4V2uDAfxFk2WSaklnQYNAtUAuKxbKRCmowBqVn7PTRZlUb7S2k1HRH-rMdF64E9da35RheTJMsa3rDQZf7o_k1-yFvUTDG9U_CDGSVlwVIB72t5EK0mthZlgsmDDe8cBgQn1aIlY17eIhrx8qTnKbD2e_bKWsCO9VSeN3BXeFpO5syXWN6ECzTMDgAAb_IAoIm43peSeviIMRzKT0dMN7iCE98419ghlMDCVv375uI26ujFpX_DrP8Fs2tw6tTRdYsaDTyq7KUqydGbgE2lS1uccD8LPYG5zAPQxpJlj9lrwLZe8y1frjFiemDoq65an86QaG1O1pVFsyighHBH1S-Wyw7Bghv2wG6xGJTD5aKYYE9nv4UTBWakEg6hSAtWdQz_Thf-TlxvGIB68CGLRwZdDYPlaLbFK9Xn2yxWD56pP-Qog9e780MYFZXmfCKt31Zatug6J3sMZYD_oqoXHq92iSXJWgRi3dQzd43KJ7qzwPa7GVhyu5GV1fgS5SdarlDJPiip9XoD3WrKxM0KamMB14Gp_dlaOsRx7ZTfkaia4CFyX6USiJGtUwu34IG1LilP5fP43zOh6f7-Byz8UB_TRxlsoYnd_IVv4ojcjMF7Zo7TGc0hPBDhWHTzNSRysiU6SQ4CCMeX-cNfYwSRNMdgRZFpK4DeqJUTGCG9JuImSskPrGVzPBy4HtIu7i5-_PpRRQpwZvpKl_BzF_cORVzQ&token_type=bearer&expires_in=14400&scope=account_info.read+files.content.read+files.content.write+files.metadata.read+files.metadata.write&uid=1436509923&account_id=dbid%3AAACUvj2GM3rsSJmi0O2MinngIIfXMm3Ztgk"

myString.split("&").forEach(param => {
  const parts = param.replace(/\+/g, " ").split("=")

  let key = parts.shift();
  let val = parts.length > 0 ? parts.join("=") : undefined;

  console.log("key", key)

  console.log('val', val);

})
