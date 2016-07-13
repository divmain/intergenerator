{
  "targets": [
    {
      "target_name": "addon",
      "sources": [
        "addon.cc",
        "async.cc"
      ],
      "include_dirs": [
        "rapidjson",
        "<!(node -e \"require('nan')\")",
        "<!(node -e \"require('nan-marshal')\")"
      ],
      "conditions": [
        ["OS=='mac'", {
          "xcode_settings": {
            "OTHER_CFLAGS": [
              "-std=c++11",
              "-stdlib=libc++",
              "-fexceptions"

            ],
            "OTHER_CPLUSPLUSFLAGS!": [
              "-Os",
              "-O4"
            ],
          }
        }]
      ]
    }
  ]
}
