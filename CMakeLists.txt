cmake_minimum_required(VERSION 2.8.12)

set(config ./src/config.json )
set(sources ./src/main.c ${config})
set(headers)

set_source_files_properties(${config} PROPERTIES HEADER_FILE_ONLY ON)

# include_directories(../../core/inc ${GW_INC})

add_executable(gw ${headers} ${sources})
target_link_libraries(gw ${LIBS})

# make gateway depend on other modules
# add_dependencies(gw nodejs_binding logger)

# linkSharedUtil(gw)
# install_broker(gw ${CMAKE_CURRENT_BINARY_DIR}/$(Configuration) )
# copy_node_dll(gw ${CMAKE_CURRENT_BINARY_DIR}/$(Configuration) )
# copy_gateway_dll(gw ${CMAKE_CURRENT_BINARY_DIR}/$(Configuration) )

# add_sample_to_solution(gw)

