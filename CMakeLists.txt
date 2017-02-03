cmake_minimum_required(VERSION 2.8.12)

set(config ./src/config.json )
set(sources ./src/main.c ${config})
set(headers)

set_source_files_properties(${config} PROPERTIES  HEADER_FILE_ONLY ON)

include_directories(../../core/inc ${GW_INC})

set(LIBS ${LIBS} gateway)

add_executable(gateway ${headers} ${sources})
target_link_libraries(gateway ${LIBS})

# make gateway depend on other modules
add_dependencies(gateway nodejs_binding logger)

linkSharedUtil(gateway)
install_broker(gateway ${CMAKE_CURRENT_BINARY_DIR}/$(Configuration) )
copy_node_dll(gateway ${CMAKE_CURRENT_BINARY_DIR}/$(Configuration) )
copy_gateway_dll(gateway ${CMAKE_CURRENT_BINARY_DIR}/$(Configuration) )

add_sample_to_solution(gateway)